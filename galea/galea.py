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

from pyhelm3 import Client


class Galea():
    """
    Class used to manage plugin releases via HELM.
    """
    def __init__(self):
        self.client = Client()
        self.releases = {
                            "releases": []
                        }


    async def refresh_releases(self) -> None:
        """
        Refreshes cached releases helm releases.
        """
        self.releases = await self.read_releases()

    def get_releases(self) -> dict:
        """
        Returns cached helm releases.
        """
        return self.releases

    def get_release(self, release_name: str) -> dict:
        """
        Returns cached helm release.
        """
        for release_dict in self.releases["releases"]:
            if release_dict["name"] == release_name:
                return release_dict
        return  {
                    "release": {}
                }

    
    # CREATE
    async def create_release(self, release_name: str, repo_url: str, version: str) -> dict:
        """
        Installs a plugin release based on given arguments.
        """
        chart = await self.client.get_chart(chart_ref=release_name, repo=repo_url, version=version)
        revision = await self.client.install_or_upgrade_release(release_name=release_name, chart=chart)
        
        release_dict =  {
                            "release":  {
                                            "name": revision.release.name,
                                            "namespace": revision.release.namespace,
                                            "revision": revision.revision,
                                            "status": revision.status
                                        }
                        }
        
        await self.refresh_releases()

        return release_dict


    # READ
    async def read_releases(self) -> dict:
        """
        Retrieves running releases helm release details.
        """
        releases = await self.client.list_releases(all = True, all_namespaces = True)
        releases_dict =  {
                            "releases": []
                        }
        for release in releases:
            revision = await release.current_revision()
            plugin_dict =   {
                                "release":  {
                                                "name": release.name,
                                                "namespace": release.namespace,
                                                "revision": revision.revision,
                                                "status": revision.status
                                            }
                            }
            releases_dict["releases"].append(plugin_dict)

        return releases_dict
    

    # UPDATE
    async def update_release(self, release_name: str, repo_url: str, version: str) -> dict:
        """
        Installs or upgrades a given plugin release based on given arguments.
        """
        chart = await self.client.get_chart(chart_ref=release_name, repo=repo_url, version=version)
        revision = await self.client.install_or_upgrade_release(release_name=release_name, chart=chart, force=True)
        
        release_dict =  {
                            "release":  {
                                            "name": revision.release.name,
                                            "namespace": revision.release.namespace,
                                            "revision": revision.revision,
                                            "status": revision.status
                                        }
                        }
        
        await self.refresh_releases()

        return release_dict

    # DELETE
    async def delete_release(self, release_name: str) -> None:
        """
        Uninstalls a given release.
        """
        await self.client.uninstall_release(release_name=release_name)

        await self.refresh_releases()
