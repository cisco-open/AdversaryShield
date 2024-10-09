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

import { InputNumber, Input} from "antd";
import { PluginParamsItem, ParamsTypes} from "services/inrfaces-api";


function integerNumberFormater(val: any) {
  if (val) {
    return Number(val).toFixed(0);
  }
  return val;
}

export function renderInput(param?: PluginParamsItem): JSX.Element {
	if(!param) return <></>
	switch (param.parameter_type) {
		case ParamsTypes.integer:
			return (
				<InputNumber
					addonBefore='default'
					formatter={integerNumberFormater}
				></InputNumber>
			);
		case ParamsTypes.string:
			return <Input addonBefore='default'></Input>;
	}
}






