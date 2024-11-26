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

import json
from flask import Flask, request, Response, send_from_directory
from tabularium import Tabularium

app = Flask(__name__, static_folder="frontend/build/browser", static_url_path='')
tabularium = Tabularium(app=app)


# CREATE
@app.route("/api/defenses", methods=["POST"])
def create_defense() -> Response:
    """
    Creates defense and parameters entries based on provided JSON.
    """
    try:
        tabularium.create_defense(defense_dict=request.json)
        
        return Response(status=201)
    except Exception as e:
        print("Exception:", e, str(e))
        return Response(response=json.dumps({"err": e, "strerr": str(e)}), status=400)


# READ
@app.route("/api/defenses", methods=["GET"])
def read_defenses() -> Response:
    """
    Reads defenses from 'defenses' table and parameters from 'parameters' table and return as JSON.
    """
    try:
        defenses_dict = tabularium.read_defenses()

        return Response(response=json.dumps(defenses_dict), status=200)
    except Exception as e:
        print("Exception:", e, str(e))
        return Response(response=json.dumps({"err": e, "strerr": str(e)}), status=400)
    

@app.route("/api/defenses/<int:defense_id>", methods=["GET"])
def read_defense(defense_id: int) -> Response:
    """
    Reads defense from 'defenses' table and parameters from 'parameters' table.
    """
    try:
        defense_dict = tabularium.read_defense(defense_id=defense_id)

        return Response(response=json.dumps(defense_dict), status=200)
    except Exception as e:
        print("Exception:", e, str(e))
        return Response(response=json.dumps({"err": e, "strerr": str(e)}), status=400)
    

@app.route("/api/releases", methods=["GET"])
def read_releases() -> Response:
    """
    Reads releases.
    """
    try:
        releases_dict = tabularium.get_releases()

        return Response(response=json.dumps(releases_dict), status=200)
    except Exception as e:
        print("Exception:", e, str(e))
        return Response(response=json.dumps({"err": e, "strerr": str(e)}), status=400)


# UPDATE
@app.route("/api/defenses/<int:defense_id>", methods=["PUT"])
def update_defense(defense_id: int) -> Response:
    # ToDo: Align with new route and logic
    """
    Updates defenses and parameters into database based on provided JSON.
    """
    try:
        tabularium.update_defense(defense_dict=request.json)

        return Response(status=200)
    except Exception as e:
        print("Exception:", e, str(e))
        return Response(response=json.dumps({"err": e, "strerr": str(e)}), status=400)


# DELETE
@app.route("/api/defenses/<int:defense_id>", methods=["DELETE"])
def delete_defense(defense_id: int) -> Response:
    """
    Deletes defense and parameters from database.
    """
    try:
        tabularium.delete_defense_and_parameters(defense_id=defense_id)

        return Response(status=204)
    except Exception as e:
        print("Exception:", e, str(e))
        return Response(response=json.dumps({"err": e, "strerr": str(e)}), status=400)


# RUN
@app.route("/api/run", methods=["POST"])
def run():
    """
    Runs test.
    """
    try:
        result_dict = tabularium.marathon.run(defense_run_dict=request.json)

        return Response(response=json.dumps(result_dict), status=201)
    except Exception as e:
        print("Exception:", e, str(e))
        return Response(response=json.dumps({"err": e, "strerr": str(e)}), status=400)


# TEST
@app.route("/api/test/defenses", methods=["GET"])
def get_defenses() -> Response:
    """
    Gets defenses.
    """
    try:
        defenses_dict = tabularium.get_defenses()

        return Response(response=json.dumps(defenses_dict), status=200)
    except Exception as e:
        print("Exception:", e, str(e))
        return Response(response=json.dumps({"err": e, "strerr": str(e)}), status=400)
    

@app.route("/api/test/releases", methods=["GET"])
def get_releases() -> Response:
    """
    Gets releases.
    """
    try:
        releases_dict = tabularium.get_releases()

        return Response(response=json.dumps(releases_dict), status=200)
    except Exception as e:
        print("Exception:", e, str(e))
        return Response(response=json.dumps({"err": e, "strerr": str(e)}), status=400)


# INDEX
@app.route('/', defaults={'path': ''})
@app.route("/<path>")
def index(path):
    """
    Main route launching the React Frontend App.
    """
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
