# Copyright 2024 Cisco Systems, Inc. and its affiliates
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# SPDX-License-Identifier: Apache-2.0

from mysqlmgr import MySQLManager
from galeadispatcher import GaleaDispacher
from marathon import Marathon


class Tabularium():
    def __init__(self, app):
        self.mysqlmgr = MySQLManager(app=app)
        self.plugins = self.read_plugins()
        self.galea_dispatcher = GaleaDispacher()
        self.releases = self.galea_dispatcher.dispatch_read_all()
        self.marathon = Marathon()
        self.results = self.marathon.get_results()


    def refresh_plugins(self):
        self.plugins = self.read_plugins()

    def refresh_releases(self):
        self.releases = self.galea_dispatcher.dispatch_read_all()

    def get_plugins(self) -> dict:
        return self.plugins

    def get_plugin(self, plugin_id: int) -> dict:
        for plugin_dict in self.plugins["plugins"]:
            if plugin_dict["plugin"]["id"] == plugin_id:
                return plugin_dict
        return  {
                    "plugin": {}
                }
    
    def get_releases(self):
        return self.releases
    
    def get_release(self, release_name: str) -> dict:
        for plugin_dict in self.plugins["releases"]:
            if plugin_dict["release"]["name"] == release_name:
                return plugin_dict
        return  {
                    "release": {}
                }


    # CREATE
    def create_plugin(self, plugin_dict: dict) -> None:
        """
        Creates plugin entry into 'plugins' table and parameters entries into 'parameters' table.

        Arguments:
            plugin_dict (dict): Plugin dictionary containing plugin details and its parameters
        """
        # Create plugin record
        self.mysqlmgr.create_plugin(name=plugin_dict["plugin"]["name"],
                              repo_url=plugin_dict["plugin"]["repo_url"],
                              version=plugin_dict["plugin"]["version"])

        # Read created plugin by name to get id
        plugin_id = self.mysqlmgr.read_plugin_by_name_and_version(name=plugin_dict["plugin"]["name"], version=plugin_dict["plugin"]["version"])[0][0]

        plugin_parameters_list = plugin_dict["plugin"]["parameters"]
        for parameter_dict in plugin_parameters_list:
            parameter = parameter_dict["parameter"]
            self.mysqlmgr.create_parameter(plugin_id=plugin_id, **parameter)

        self.galea_dispatcher.dispatch_install(release_name=plugin_dict["plugin"]["name"],
                                               repo_url=plugin_dict["plugin"]["repo_url"],
                                               version=plugin_dict["plugin"]["version"])
        
        self.refresh_plugins()
        self.refresh_releases()


    # READ
    def read_plugins(self) -> dict:
        """
        Returns queried plugins and their parameters as a dictionary.
        """
        # Prepare plugins dict
        plugins_dict =  {
                            "plugins": []
                        }
        
        # Read plugins tuple(tuple)
        plugins_tuple = self.mysqlmgr.read_plugins()
        
        # Assemble plugin dicts from tuple(tuple)
        for plugin_tuple in plugins_tuple:
            # Assemble plugin dict from tuple
            plugin_dict =   {
                                "plugin":
                                    {
                                        "id": plugin_tuple[0], 
                                        "name": plugin_tuple[1], 
                                        "repo_url": plugin_tuple[2],
                                        "version": plugin_tuple[3]
                                    }
                            }
            
            # Read parameters tuple(tuple)
            parameters_tuple = self.mysqlmgr.read_parameters(plugin_id=plugin_tuple[0])
            # Prepare parameters dict
            parameters_dict =   {
                                    "parameters": []
                                }
            
            # Assemble parameters dict from tuple(tuple)
            for parameter_tuple in parameters_tuple:
                # Assemble parameter dict from tuple
                parameter_dict =    {
                                        "parameter": 
                                            {
                                                "id": parameter_tuple[0],
                                                "parameter_key": parameter_tuple[2],
                                                "parameter_type": parameter_tuple[3],
                                                "default_value": parameter_tuple[4],
                                                "is_mandatory": parameter_tuple[5],
                                                "is_read_only": parameter_tuple[6]
                                            }
                                    }
                parameters_dict["parameters"].append(parameter_dict)
            plugin_dict["plugin"].update(parameters_dict)

            plugins_dict["plugins"].append(plugin_dict)
        
        return plugins_dict


    def read_plugin(self, plugin_id: int) -> dict:
        """
        Returns queried plugin and its parameters as a dictionary.
        """
        # Prepare plugin dict
        plugin_dict =   {
                            "plugin": {}
                        }
        # Prepare parameters dict
        parameters_dict =   {
                                "parameters": []
                            }
        
        # Read plugin
        plugin_tuple = self.mysqlmgr.read_plugin_by_id(id=plugin_id)

        # Read parameters
        parameters_tuple = self.mysqlmgr.read_parameters(plugin_id=plugin_tuple[0][0])

        # Assemble plugin dict from tuple(tuple)
        plugin_dict["plugin"].update(
                                        {
                                            "id": plugin_tuple[0][0],
                                            "name": plugin_tuple[0][1],
                                            "repo_url": plugin_tuple[0][2],
                                            "version": plugin_tuple[0][3]
                                        }
                                    )
        # Assemble parameters dict from tuple(tuple)
        for parameter_tuple in parameters_tuple:
            # Assemble parameter dict from tuple
            parameter_dict =    {
                                    "parameter":
                                        {
                                            "id": parameter_tuple[0],
                                            "parameter_key": parameter_tuple[2],
                                            "parameter_type": parameter_tuple[3],
                                            "default_value": parameter_tuple[4],
                                            "is_mandatory": parameter_tuple[5],
                                            "is_read_only": parameter_tuple[6]
                                        }
                                }
            parameters_dict["parameters"].append(parameter_dict)

        plugin_dict["plugin"].update(parameters_dict)

        return plugin_dict
    

    # UPDATE
    def update_plugin(self, plugin_dict: dict) -> None:
        """
        Updates plugin record and its parameters' records.
        """
        # Update plugin
        self.mysqlmgr.update_plugin(id=plugin_dict["plugin"]["id"],
                               name=plugin_dict["plugin"]["name"], repo_url=plugin_dict["plugin"]["repo_url"], version=plugin_dict["plugin"]["version"])

        # Calculate deleted parameters
        queried_parameters = self.mysqlmgr.read_parameters(plugin_id=plugin_dict["plugin"]["id"])
        queried_parameters_ids_list = []
        for queried_parameter in queried_parameters:
            queried_parameter_id = queried_parameter[0]
            queried_parameters_ids_list.append(queried_parameter_id)

        plugin_parameters_list = plugin_dict["plugin"]["parameters"]
        plugin_parameters_ids_list = [plugin_parameter["parameter"]["id"] for plugin_parameter in plugin_parameters_list if ("id" in plugin_parameter["parameter"].keys())]

        deleted_parameters_ids_list = [parameter_id for parameter_id in queried_parameters_ids_list if parameter_id not in plugin_parameters_ids_list]
        for parameter_id in deleted_parameters_ids_list:
            self.mysqlmgr.delete_parameter(id=parameter_id)

        # Update already existing parameters or create the newly added ones (identifiable by lack of id)
        for parameter in plugin_parameters_list:
            if "id" in parameter["parameter"].keys():
                self.mysqlmgr.update_parameter(id=parameter["parameter"]["id"],
                                         parameter_key=parameter["parameter"]["parameter_key"], parameter_type=parameter["parameter"]["parameter_type"], default_value=parameter["parameter"]["default_value"],
                                         is_mandatory=parameter["parameter"]["is_mandatory"], is_read_only=parameter["parameter"]["is_read_only"])
            else:
                self.mysqlmgr.create_parameter(plugin_id=plugin_dict["plugin"]["id"], **parameter["parameter"])

        self.galea_dispatcher.dispatch_update(release_name=plugin_dict["plugin"]["name"],
                                              repo_url=plugin_dict["plugin"]["repo_url"],
                                              version=plugin_dict["plugin"]["version"])

        self.refresh_plugins()
        self.refresh_releases()


    # DELETE
    def delete_plugin_and_parameters(self, plugin_id: int) -> None:
        """
        Deletes plugin entry and its parameters' entries.
        """
        # Get plugin name
        plugin_name = self.mysqlmgr.read_plugin_by_id(id=plugin_id)[0][1]

        # Delete plugin and parameters by cascade
        self.mysqlmgr.delete_plugin(id=plugin_id)
        self.galea_dispatcher.dispatch_delete(release_name=plugin_name)

        self.refresh_plugins()
        self.refresh_releases()

    
    # RUN
    def run(self, test_dict: dict) -> dict:
        """
        Runs test via Marathon.
        """
        result_dict = self.marathon.run(test_dict=test_dict)

        return result_dict