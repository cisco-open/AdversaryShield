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
defense_run_endpoint = "/run"

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
    

    def get_result(self, defense: str) -> dict:
        for result in self.results["results"]:
            if defense == result["defense"]:
                return result
        return {}


    def delete_result(self, defense: str):
        for result_index in range(len(self.results["results"])):
            if defense == self.results["results"][result_index]["result"]["defense"]:
                self.results["results"].pop(result_index)
                break


    def update_results(self, result_dict: dict):
        self.delete_result(result_dict["result"]["defense"])
        self.results["results"].append(result_dict)


    def run(self, defense_run_dict: dict) -> dict:
        """
        defense_run_dict = 
        {
            "defense": ExampleDefense,
            "parameters":
                {
                    "message": {
                                    "role": "user",
                                    "content": "Example prompt."
                                },
                    "defense": {
                                    "example_defense_parameter": example
                                }
                    "targetmodel": {
                                        "model": "ExampleModel",
                                        "url": "http://example.url:exampleport/example/path",
                                        "method": "example_method",
                                        "arguments": null
                                    }
                }
        }
        """
        result = requests.post(url=f"http://{defense_run_dict['defense']}{release_cluster_url}{defense_run_endpoint}", json=defense_run_dict["parameters"], timeout=None)
        result_dict =   {
                            "result": 
                                {
                                    "defense": defense_run_dict["defense"],
                                    "parameters": defense_run_dict["parameters"],
                                    "result": result.json()
                                }
                        }
        
        self.update_results(result_dict=result_dict)

        return result_dict