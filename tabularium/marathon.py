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

import requests


release_cluster_url = ".default.svc.cluster.local:80"
plugin_run_endpoint = "/run"

class Marathon():
    """
    Manages test running.
    """
    def __init__(self):
        self.results =  {
                            "results": []
                        }
    

    def get_results(self) -> dict:
        return self.results
    

    def get_result(self, plugin: str) -> dict:
        for result in self.results["results"]:
            if plugin == result["plugin"]:
                return result
        return {}


    def delete_result(self, plugin: str):
        for result_index in range(len(self.results["results"])):
            if plugin == self.results["results"][result_index]["result"]["plugin"]:
                self.results["results"].pop(result_index)
                break


    def update_results(self, result_dict: dict):
        self.delete_result(result_dict["result"]["plugin"])
        self.results["results"].append(result_dict)


    def run(self, test_dict: dict) -> dict:
        result = requests.post(url=f"http://{test_dict['test']['plugin']}{release_cluster_url}{plugin_run_endpoint}", json=test_dict, timeout=None)
        result_dict =   {
                            "result": 
                                {
                                    "plugin": test_dict["test"]["plugin"],
                                    "prompt": test_dict["test"]["prompt"],
                                    "parameters": test_dict["test"]["parameters"],
                                    "output": result.content.decode('utf-8')
                                }
                        }
        
        self.update_results(result_dict=result_dict)

        return result_dict