/**
 * Copyright 2024 Cisco Systems, Inc. and its affiliates
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PluginItemApi, PluginsApi } from "./inrfaces-api";
// import { plugs } from "./mockAPI";

import axios from "axios";

const ApiInstance = axios.create({
  baseURL: ``,
});


export const getPlugins = async (): Promise<PluginsApi> => {
  return (await ApiInstance
    .get<PluginsApi>('/plugins'))?.data;
};

export const getPlugin = async (name: string): Promise<PluginItemApi> => {
  return (await ApiInstance
    .get<PluginItemApi>('/plugins/' + name))?.data;
};

export const createPlugin = async (data: PluginItemApi): Promise<PluginItemApi> => {
  return (await ApiInstance
    .post<PluginItemApi>('/plugins', data))?.data;
};

export const updatePlugin = async (data: PluginItemApi): Promise<PluginItemApi> => {
  return (await ApiInstance
    .put<PluginItemApi>('/plugins', data))?.data;
};

export const deletePlugin = async (data: PluginsApi): Promise<PluginsApi> => {
  return (await ApiInstance
    .post<PluginsApi>('/plugins/delete', data))?.data;
};


// mock data
// export async function getPlugins(): Promise<PluginsApi> {
//   const res = new Promise<PluginsApi>((rez) => {
//     rez({
//       plugins: plugs
//     });
//   })
//   return res;
// };

// export async function getPlugin(name: string): Promise<PluginItemApi | undefined> {
//   const res = new Promise<PluginItemApi | undefined> ((rez) => {
//     rez(plugs.find((item) => item.plugin.plugin_name === name));
//   })
//   return res;
// };


// export async function updatePlugin(data: PluginItemApi): Promise<PluginItemApi | undefined> {
//   const res = new Promise<PluginItemApi | undefined> ((rez) => {
//     let index = plugs.findIndex((item) => item.plugin.plugin_name === data.plugin.plugin_name);
//     if(index > -1) {
//       plugs[index] = data;
//     }
//     rez(plugs[index]);
//   })
//   return res;
// };
