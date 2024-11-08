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
    def create_defense(self, name: str, repo_url: str, version: str):
        """
        Creates defense entry into the 'defenses' table.

        Arguments:
            name (str): defense name
            repo_url (str): defense repository url
            version (str): defense version
        """
        connector = self.mysql.connect()
        cursor = connector.cursor()

        query = "INSERT INTO defenses(name, repo_url, version) " \
                "VALUES(%s, %s, %s)"
        args = (name, repo_url, version)

        cursor.execute(query=query, args=args)
        connector.commit()
        
        cursor.close()
        connector.close()


    def create_parameter(self,
                         defense_id: int,
                         parameter_key: str, parameter_type: str,
                         is_mandatory: bool, is_read_only: bool,
                         default_value: Union[int, str, bool, None] = None):
        """
        Creates parameter entry into the 'parameters' table.

        Arguments:
            defense_id (int): defense id
            parameter_key (str): Parameter name
            parameter_type (str): Parameter type
            default_value (type): Default value of parameter
            is_mandatory (bool): Argument indicating if parameter is mandatory
            is_read_only (bool): Argument indicating if parameter is read only
        """
        connector = self.mysql.connect()
        cursor = connector.cursor()

        query = "INSERT INTO parameters(defense_id, " \
                "parameter_key, parameter_type, " \
                "default_value, " \
                "is_mandatory, is_read_only) " \
                "VALUES(%s, %s, %s, %s, %s, %s)"
        args = (defense_id, parameter_key, parameter_type, default_value, is_mandatory, is_read_only)

        cursor.execute(query=query, args=args)
        connector.commit()


    # READ
    def read_defense_by_id(self, id: str) -> tuple:
        """
        Returns query response for entry within 'defenses' table based on provided defense id.

        Returns:
            defenses_ruple (tuple): Tuple containing the query response as 
                                    ((id, name, repo_url, version),)
        """
        connector = self.mysql.connect()
        cursor = connector.cursor()

        query = "SELECT * FROM defenses " \
                "WHERE id=%s"
        args = (id)

        cursor.execute(query=query, args=args)
        defense_tuple = cursor.fetchall()

        cursor.close()
        connector.close()

        return defense_tuple

    def read_defense_by_name_and_version(self, name: str, version: str) -> tuple:
        """
        Returns query response for entry within 'defenses' table based on provided defense name.
        Usually used to get the id after creation.

        Returns:
            defenses (tuple): Tuple containing the query response as 
                                ((id, name, repo_url, version),)
        """
        connector = self.mysql.connect()
        cursor = connector.cursor()

        query = "SELECT * FROM defenses " \
                "WHERE name=%s AND version=%s"
        args = (name, version)

        cursor.execute(query=query, args=args)
        defense = cursor.fetchall()

        cursor.close()
        connector.close()

        return defense
    
    def read_parameter(self, id: int) -> tuple:
        """
        Returns query response for parameter entry.

        Arguments:
            id (int): defense id

        Returns:
            parameter (tuple): Tuple containing the query response as 
                                ((id, defense_id, parameter_key, parameter_type, default_value, is_mandatory, is_read_only),)
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


    def read_defenses(self) -> tuple:
        """
        Returns query response for all entries within 'defenses' table.

        Returns:
            defenses (tuple): Tuple containing the query response as 
                                ((id, name, repo_url, version), ...)
        """
        connector = self.mysql.connect()
        cursor = connector.cursor()

        query = "SELECT * FROM defenses"

        cursor.execute(query=query)
        defenses_tuple = cursor.fetchall()

        cursor.close()
        connector.close()

        return defenses_tuple


    def read_parameters(self, defense_id: int) -> tuple:
        """
        Returns query response for all entries within 'parameters' table corresponding to the provided defense.

        Arguments:
            defense_id (int): defense id

        Returns:
            parameters (tuple): Tuple containing the query response as 
                                ((id, defense_id, parameter_key, parameter_type, default_value, is_mandatory, is_read_only), ...)
        """
        connector = self.mysql.connect()
        cursor = connector.cursor()

        query = "SELECT * FROM parameters " \
                "WHERE defense_id=%s"
        args = (defense_id)

        cursor.execute(query=query, args=args)
        parameters = cursor.fetchall()

        cursor.close()
        connector.close()

        return parameters


    # UPDATE
    def update_defense(self, id: int, name: str, repo_url: str, version: str):
        """
        Updates a defense based on the received data.

        Parameters:
            id (int): defense id
            name (str): defense name
            repo_url (str): defense url
            version (str): defense version
        """
        connector = self.mysql.connect()
        cursor = connector.cursor()

        query = "UPDATE defenses " \
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
    def delete_defense(self, id: int):
        """
        Deletes the defense entry.

        Parameters:
            id (int): defense id
        """
        connector = self.mysql.connect()
        cursor = connector.cursor()

        query = "DELETE FROM defenses " \
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

    def delete_parameters(self, defense_id: int):
        """
        Deletes the parameters entries of a defense.

        Parameters:
            defense_id (id): Parameter's defense id
        """
        connector = self.mysql.connect()
        cursor = connector.cursor()

        query = "DELETE FROM parameters " \
                "WHERE defense_id=%s"
        args = (defense_id)

        cursor.execute(query=query, args=args)
        connector.commit()

        cursor.close()
        connector.close()