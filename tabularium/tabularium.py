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

from archivum import Archivum
from galeadispatcher import GaleaDispacher
from marathon import Marathon


class Tabularium():
    def __init__(self, app):
        self.mysqlmgr = Archivum(app=app)
        self.defenses = self.read_defenses()
        self.galea_dispatcher = GaleaDispacher()
        self.releases = self.galea_dispatcher.dispatch_read_all()
        self.marathon = Marathon()
        self.results = self.marathon.get_results()


    def refresh_defenses(self):
        self.defenses = self.read_defenses()

    def refresh_releases(self):
        self.releases = self.galea_dispatcher.dispatch_read_all()

    def get_defenses(self) -> dict:
        return self.defenses

    def get_defense(self, defense_id: int) -> dict:
        for defense_dict in self.defenses["defenses"]:
            if defense_dict["defense"]["id"] == defense_id:
                return defense_dict
        return  {
                    "defense": {}
                }
    
    def get_releases(self):
        return self.releases
    
    def get_release(self, release_name: str) -> dict:
        for defense_dict in self.defenses["releases"]:
            if defense_dict["release"]["name"] == release_name:
                return defense_dict
        return  {
                    "release": {}
                }

    # CREATE
    def create_defense(self, defense_dict: dict) -> None:
        """
        Creates defense entry into 'defenses' table and parameters entries into 'parameters' table.

        Arguments:
            defense_dict (dict): defense dictionary containing defense details and its parameters
        """
        # Create defense record
        self.mysqlmgr.create_defense(name=defense_dict["defense"]["name"],
                              repo_url=defense_dict["defense"]["repo_url"],
                              version=defense_dict["defense"]["version"])

        # Read created defense by name to get id
        defense_id = self.mysqlmgr.read_defense_by_name_and_version(name=defense_dict["defense"]["name"], version=defense_dict["defense"]["version"])[0][0]

        defense_parameters_list = defense_dict["defense"]["parameters"]
        for parameter_dict in defense_parameters_list:
            parameter = parameter_dict["parameter"]
            self.mysqlmgr.create_parameter(defense_id=defense_id, **parameter)

        self.galea_dispatcher.dispatch_install(release_name=defense_dict["defense"]["name"],
                                               repo_url=defense_dict["defense"]["repo_url"],
                                               version=defense_dict["defense"]["version"])
        
        self.refresh_defenses()
        self.refresh_releases()

    # READ
    def read_defenses(self) -> dict:
        """
        Returns queried defenses and their parameters as a dictionary.
        """
        # Prepare defenses dict
        defenses_dict =  {
                            "defenses": []
                        }
        
        # Read defenses tuple(tuple)
        defenses_tuple = self.mysqlmgr.read_defenses()
        
        # Assemble defense dicts from tuple(tuple)
        for defense_tuple in defenses_tuple:
            # Assemble defense dict from tuple
            defense_dict =   {
                                "defense":
                                    {
                                        "id": defense_tuple[0], 
                                        "name": defense_tuple[1], 
                                        "repo_url": defense_tuple[2],
                                        "version": defense_tuple[3]
                                    }
                            }
            
            # Read parameters tuple(tuple)
            parameters_tuple = self.mysqlmgr.read_parameters(defense_id=defense_tuple[0])
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
            defense_dict["defense"].update(parameters_dict)

            defenses_dict["defenses"].append(defense_dict)
        
        return defenses_dict

    def read_defense(self, defense_id: int) -> dict:
        """
        Returns queried defense and its parameters as a dictionary.
        """
        # Prepare defense dict
        defense_dict =   {
                            "defense": {}
                        }
        # Prepare parameters dict
        parameters_dict =   {
                                "parameters": []
                            }
        
        # Read defense
        defense_tuple = self.mysqlmgr.read_defense_by_id(id=defense_id)

        # Read parameters
        parameters_tuple = self.mysqlmgr.read_parameters(defense_id=defense_tuple[0][0])

        # Assemble defense dict from tuple(tuple)
        defense_dict["defense"].update(
                                        {
                                            "id": defense_tuple[0][0],
                                            "name": defense_tuple[0][1],
                                            "repo_url": defense_tuple[0][2],
                                            "version": defense_tuple[0][3]
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

        defense_dict["defense"].update(parameters_dict)

        return defense_dict
    
    # UPDATE
    def update_defense(self, defense_dict: dict) -> None:
        """
        Updates defense record and its parameters' records.
        """
        # Update defense
        self.mysqlmgr.update_defense(id=defense_dict["defense"]["id"],
                               name=defense_dict["defense"]["name"], repo_url=defense_dict["defense"]["repo_url"], version=defense_dict["defense"]["version"])

        # Calculate deleted parameters
        queried_parameters = self.mysqlmgr.read_parameters(defense_id=defense_dict["defense"]["id"])
        queried_parameters_ids_list = []
        for queried_parameter in queried_parameters:
            queried_parameter_id = queried_parameter[0]
            queried_parameters_ids_list.append(queried_parameter_id)

        defense_parameters_list = defense_dict["defense"]["parameters"]
        defense_parameters_ids_list = [defense_parameter["parameter"]["id"] for defense_parameter in defense_parameters_list if ("id" in defense_parameter["parameter"].keys())]

        deleted_parameters_ids_list = [parameter_id for parameter_id in queried_parameters_ids_list if parameter_id not in defense_parameters_ids_list]
        for parameter_id in deleted_parameters_ids_list:
            self.mysqlmgr.delete_parameter(id=parameter_id)

        # Update already existing parameters or create the newly added ones (identifiable by lack of id)
        for parameter in defense_parameters_list:
            if "id" in parameter["parameter"].keys():
                self.mysqlmgr.update_parameter(id=parameter["parameter"]["id"],
                                         parameter_key=parameter["parameter"]["parameter_key"], parameter_type=parameter["parameter"]["parameter_type"], default_value=parameter["parameter"]["default_value"],
                                         is_mandatory=parameter["parameter"]["is_mandatory"], is_read_only=parameter["parameter"]["is_read_only"])
            else:
                self.mysqlmgr.create_parameter(defense_id=defense_dict["defense"]["id"], **parameter["parameter"])

        self.galea_dispatcher.dispatch_update(release_name=defense_dict["defense"]["name"],
                                              repo_url=defense_dict["defense"]["repo_url"],
                                              version=defense_dict["defense"]["version"])

        self.refresh_defenses()
        self.refresh_releases()

    # DELETE
    def delete_defense_and_parameters(self, defense_id: int) -> None:
        """
        Deletes defense entry and its parameters' entries.
        """
        # Get defense name
        defense_name = self.mysqlmgr.read_defense_by_id(id=defense_id)[0][1]

        # Delete defense and parameters by cascade
        self.mysqlmgr.delete_defense(id=defense_id)
        self.galea_dispatcher.dispatch_delete(release_name=defense_name)

        self.refresh_defenses()
        self.refresh_releases()

    # RUN
    def run(self, defense_run_dict: dict) -> dict:
        """
        Runs test via Marathon.
        """
        result_dict = self.marathon.run(defense_run_dict=defense_run_dict)

        return result_dict