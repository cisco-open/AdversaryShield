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
from flask import Flask, request, Response
from galea import Galea

app = Flask(__name__)
galea = Galea()

# CREATE
@app.route("/releases", methods=["POST"])
async def create_release():
    """
    Installs release.
    """
    release_dict = await galea.create_release(release_name=request.json["release"]["name"],
                                              repo_url=request.json["release"]["repo_url"],
                                              version=request.json["release"]["version"])
    
    return Response(response=json.dumps(release_dict),
                    status=201)


# READ
@app.route("/releases", methods=["GET"])
def get_releases() -> Response:
    """
    Gets running releases.
    """
    releases_dict = galea.get_releases()

    return Response(response=json.dumps(releases_dict),
                    status=200)


@app.route("/releases/<string:release>", methods=["GET"])
def get_release(release: str) -> Response:
    """
    Gets running release.
    """
    pass


# UPDATE
@app.route("/releases/<string:release>", methods=["PUT"])
async def update_release(release: str) -> Response:
    """
    Updates running release.
    """
    if release != request.json["release"]["name"]:
        return Response(status=418)
    
    release_dict = await galea.update_release(release_name=request.json["release"]["name"],
                                              repo_url=request.json["release"]["repo_url"],
                                              version=request.json["release"]["version"])

    return Response(response=json.dumps(release_dict),
                    status=201)


# DELETE
@app.route("/releases/<string:release>", methods=["DELETE"])
async def delete_release(release: str) -> Response:
    """
    Uninstalls running release.
    """
    await galea.delete_release(release_name=release)

    return Response(status=204)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
