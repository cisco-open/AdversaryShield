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


export enum ParamsTypes {
  string = 'string',
  integer = 'integer'
}

export interface PluginParamsItem<data = unknown> {
  id?: string | number;
  parameter_key: string,
  parameter_type: ParamsTypes,
  is_mandatory: boolean,
  is_read_only: boolean
  default_value?: data,
}

export interface PluginItem {
  id?: string | number;
  plugin_name: string,
  plugin_url: string,
  parameters: PluginParamsItem[],
}

export interface PluginItemApi {
  plugin: PluginItem
}

export interface PluginsApi {
  plugins: PluginItemApi[]
}

