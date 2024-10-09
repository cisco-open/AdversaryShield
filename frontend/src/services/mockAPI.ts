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

import { PluginParamsItem, ParamsTypes, PluginItemApi } from "./inrfaces-api";

function genParams(): PluginParamsItem[] {
  const tests: PluginParamsItem[] = [];
  const numerOfTest = Math.random() * 7;

  for (let index = 0; index < numerOfTest; index++) {
    tests.push({
      id: index,
      parameter_key: "param " + index,
      parameter_type: Math.random() < 0.5 ? ParamsTypes.string : ParamsTypes.integer,
      is_mandatory: Math.random() < 0.2,
      is_read_only: Math.random() < 0.2
    })
  }

  return tests;
}

function genPluginsMock(): PluginItemApi[] {
  const tests: PluginItemApi[] = [];
  const numerOfTest = 10;

  for (let index = 0; index < numerOfTest; index++) {
    tests.push({
      plugin: {
        id: index,
        plugin_name: "plug " + index,
        parameters: genParams(),
        plugin_url: "git " + index,
      }
    })
  }

  return tests;
}

export const plugs = genPluginsMock();
