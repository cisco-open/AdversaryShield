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
import requests


class GaleaDispacher():
    def __init__(self):
        self.galea_url = "http://galea.default.svc.cluster.local:80"
    

    def make_release_dict(self, name: str, repo_url: str, version: str) -> dict:
        return  {
                    "release":
                        {
                            "name": name,
                            "repo_url": repo_url,
                            "version": version
                        }
                }


    def dispatch_install(self, release_name: str, repo_url: str, version: str) -> dict:
        response = requests.post(url=f"{self.galea_url}/releases",
                                        json=self.make_release_dict(name=release_name, repo_url=repo_url, version=version),
                                 timeout=None)
        return json.loads(response.content)

    def dispatch_read_all(self) -> dict:
        response = requests.get(url=f"{self.galea_url}/releases",
                                timeout=None)
        return json.loads(response.content)

    def dispatch_read(self, release_name: str) -> dict:
        response = requests.get(url=f"{self.galea_url}/releases/{release_name}",
                                timeout=None)
        return json.loads(response.content)

    def dispatch_update(self, release_name: str, repo_url: str, version: str) -> dict:
        response = requests.put(url=f"{self.galea_url}/releases/{release_name}",
                                json=self.make_release_dict(name=release_name, repo_url=repo_url, version=version),
                                timeout=None)
        return json.loads(response.content)

    def dispatch_delete(self, release_name: str) -> dict:
        response = requests.delete(url=f"{self.galea_url}/releases/{release_name}",
                                   timeout=None)
        return {"msg": f"{release_name} release deleted."}