import { DynamicValueAttributeTableName } from './dynamic-value';

export const DynamicTableValueClassName = 'custom-dynamic-table-value';
export class DynamicTableValue {
  tableName: string;
  constructor(tableName: string) {
    this.tableName = tableName;
  }

  createDom() {
    const ele = document.createElement('span');
    ele.textContent = `{{ 动态表格: ${this.tableName} }}`;
    ele.className = `${DynamicTableValueClassName} mceNonEditable`;
    ele.setAttribute(DynamicValueAttributeTableName, this.tableName);
    return ele;
  }

  createHtml() {
    const ele = this.createDom();
    return ele.outerHTML;
  }
}
