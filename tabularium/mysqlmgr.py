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

import os
from typing import Union
from flaskext.mysql import MySQL


class MySQLManager():
    """
    Manages queries based on inputs and formats return data.

    Prameters:
        app: Flask class instance holding config data
    """
    def __init__(self, app):
        self.mysql = MySQL()
        self.app = app
        self.app.config["MYSQL_DATABASE_USER"] = "root"
        self.app.config["MYSQL_DATABASE_PASSWORD"] = os.getenv("db_root_password")
        self.app.config["MYSQL_DATABASE_DB"] = os.getenv("db_name")
        self.app.config["MYSQL_DATABASE_HOST"] = os.getenv("MYSQL_SERVICE_HOST")
        self.app.config["MYSQL_DATABASE_PORT"] = int(os.getenv("MYSQL_SERVICE_PORT"))
        self.mysql.init_app(self.app)


    def reinit_mysql(self):
        """
        Reinitialisation function for MySQL connection in case the service fails or suffers modifications resulting in rollout.
        """
        self.app.config["MYSQL_DATABASE_USER"] = "root"
        self.app.config["MYSQL_DATABASE_PASSWORD"] = os.getenv("db_root_password")
        self.app.config["MYSQL_DATABASE_DB"] = os.getenv("db_name")
        self.app.config["MYSQL_DATABASE_HOST"] = os.getenv("MYSQL_SERVICE_HOST")
        self.app.config["MYSQL_DATABASE_PORT"] = int(os.getenv("MYSQL_SERVICE_PORT"))
        self.mysql.init_app(self.app)


    # CREATE
    def create_plugin(self, name: str, repo_url: str, version: str):
        """
        Creates plugin entry into the 'plugins' table.

        Arguments:
            name (str): Plugin name
            repo_url (str): Plugin repository url
            version (str): Plugin version
        """
        connector = self.mysql.connect()
        cursor = connector.cursor()

        query = "INSERT INTO plugins(name, repo_url, version) " \
                "VALUES(%s, %s, %s)"
        args = (name, repo_url, version)

        cursor.execute(query=query, args=args)
        connector.commit()
        
        cursor.close()
        connector.close()


    def create_parameter(self,
                         plugin_id: int,
                         parameter_key: str, parameter_type: str,
                         is_mandatory: bool, is_read_only: bool,
                         default_value: Union[int, str, bool, None] = None):
        """
        Creates parameter entry into the 'parameters' table.

        Arguments:
            plugin_id (int): Plugin id
            parameter_key (str): Parameter name
            parameter_type (str): Parameter type
            default_value (type): Default value of parameter
            is_mandatory (bool): Argument indicating if parameter is mandatory
            is_read_only (bool): Argument indicating if parameter is read only
        """
        connector = self.mysql.connect()
        cursor = connector.cursor()

        query = "INSERT INTO parameters(plugin_id, " \
                "parameter_key, parameter_type, " \
                "default_value, " \
                "is_mandatory, is_read_only) " \
                "VALUES(%s, %s, %s, %s, %s, %s)"
        args = (plugin_id, parameter_key, parameter_type, default_value, is_mandatory, is_read_only)

        cursor.execute(query=query, args=args)
        connector.commit()


    # READ
    def read_plugin_by_id(self, id: str) -> tuple:
        """
        Returns query response for entry within 'plugins' table based on provided plugin id.

        Returns:
            plugins_ruple (tuple): Tuple containing the query response as 
                                    ((id, name, repo_url, version),)
        """
        connector = self.mysql.connect()
        cursor = connector.cursor()

        query = "SELECT * FROM plugins " \
                "WHERE id=%s"
        args = (id)

        cursor.execute(query=query, args=args)
        plugin_tuple = cursor.fetchall()

        cursor.close()
        connector.close()

        return plugin_tuple

    def read_plugin_by_name_and_version(self, name: str, version: str) -> tuple:
        """
        Returns query response for entry within 'plugins' table based on provided plugin name.
        Usually used to get the id after creation.

        Returns:
            plugins (tuple): Tuple containing the query response as 
                                ((id, name, repo_url, version),)
        """
        connector = self.mysql.connect()
        cursor = connector.cursor()

        query = "SELECT * FROM plugins " \
                "WHERE name=%s AND version=%s"
        args = (name, version)

        cursor.execute(query=query, args=args)
        plugin = cursor.fetchall()

        cursor.close()
        connector.close()

        return plugin
    
    def read_parameter(self, id: int) -> tuple:
        """
        Returns query response for parameter entry.

        Arguments:
            id (int): Plugin id

        Returns:
            parameter (tuple): Tuple containing the query response as 
                                ((id, plugin_id, parameter_key, parameter_type, default_value, is_mandatory, is_read_only),)
        """
        connector = self.mysql.connect()
        cursor = connector.cursor()

        query = "SELECT * FROM parameters " \
                "WHERE id=%s"
        args = (id)

        cursor.execute(query=query, args=args)
        parameter = cursor.fetchall()

        cursor.close()
        connector.close()

        return parameter


    def read_plugins(self) -> tuple:
        """
        Returns query response for all entries within 'plugins' table.

        Returns:
            plugins (tuple): Tuple containing the query response as 
                                ((id, name, repo_url, version), ...)
        """
        connector = self.mysql.connect()
        cursor = connector.cursor()

        query = "SELECT * FROM plugins"

        cursor.execute(query=query)
        plugins_tuple = cursor.fetchall()

        cursor.close()
        connector.close()

        return plugins_tuple


    def read_parameters(self, plugin_id: int) -> tuple:
        """
        Returns query response for all entries within 'parameters' table corresponding to the provided plugin.

        Arguments:
            plugin_id (int): Plugin id

        Returns:
            parameters (tuple): Tuple containing the query response as 
                                ((id, plugin_id, parameter_key, parameter_type, default_value, is_mandatory, is_read_only), ...)
        """
        connector = self.mysql.connect()
        cursor = connector.cursor()

        query = "SELECT * FROM parameters " \
                "WHERE plugin_id=%s"
        args = (plugin_id)

        cursor.execute(query=query, args=args)
        parameters = cursor.fetchall()

        cursor.close()
        connector.close()

        return parameters


    # UPDATE
    def update_plugin(self, id: int, name: str, repo_url: str, version: str):
        """
        Updates a plugin based on the received data.

        Parameters:
            id (int): Plugin id
            name (str): Plugin name
            repo_url (str): Plugin url
            version (str): Plugin version
        """
        connector = self.mysql.connect()
        cursor = connector.cursor()

        query = "UPDATE plugins " \
                "SET  name=%s, repo_url=%s, version=%s " \
                "WHERE id=%s"
        args = (name, repo_url, version, id)

        cursor.execute(query=query, args=args)
        connector.commit()
        
        cursor.close()
        connector.close()


    def update_parameter(self,
                         id: int,
                         parameter_key: str, parameter_type: str,
                         is_mandatory: bool, is_read_only: bool,
                         default_value: Union[int, str, bool, None] = None):
        """
        Updates a parameter based on the received data.

        Parameters:
            id (int): Parameter id
            parameter_key (str): Parameter name
            parameter_type (str): Parameter type
            default_value (type): Default value of parameter
            is_mandatory (bool): Argument indicating if parameter is mandatory
            is_read_only (bool): Argument indicating if parameter is read only
        """
        connector = self.mysql.connect()
        cursor = connector.cursor()

        query = "UPDATE parameters " \
                "SET parameter_key=%s, parameter_type=%s, default_value=%s, " \
                "is_mandatory=%s, is_read_only=%s " \
                "WHERE id=%s"
        args = (parameter_key, parameter_type, default_value, is_mandatory, is_read_only, id)

        cursor.execute(query=query, args=args)
        connector.commit()
        
        cursor.close()
        connector.close()


    # DELETE
    def delete_plugin(self, id: int):
        """
        Deletes the plugin entry.

        Parameters:
            id (int): Plugin id
        """
        connector = self.mysql.connect()
        cursor = connector.cursor()

        query = "DELETE FROM plugins " \
                "WHERE id=%s"
        args = (id)

        cursor.execute(query=query, args=args)
        connector.commit()

        cursor.close()
        connector.close()

    def delete_parameter(self, id: int):
        """
        Deletes the parameter entry.

        Parameters:
            id (id): Parameter's id
        """
        connector = self.mysql.connect()
        cursor = connector.cursor()

        query = "DELETE FROM parameters " \
                "WHERE id=%s"
        args = (id)

        cursor.execute(query=query, args=args)
        connector.commit()

        cursor.close()
        connector.close()

    def delete_parameters(self, plugin_id: int):
        """
        Deletes the parameters entries of a plugin.

        Parameters:
            plugin_id (id): Parameter's plugin id
        """
        connector = self.mysql.connect()
        cursor = connector.cursor()

        query = "DELETE FROM parameters " \
                "WHERE plugin_id=%s"
        args = (plugin_id)

        cursor.execute(query=query, args=args)
        connector.commit()

        cursor.close()
        connector.close()