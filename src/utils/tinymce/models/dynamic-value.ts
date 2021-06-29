export const DynamicValueClassName = 'custom-dynamic-value';
export const DynamicValueAttributeTableName = 'data-custom-table-name';
export const DynamicValueAttributeFieldName = 'data-custom-field-name';
export class DynamicValue {
  tableName: string;
  fieldName: string;
  constructor(tableName: string, fieldName: string) {
    this.tableName = tableName;
    this.fieldName = fieldName;
  }

  createDom() {
    const ele = document.createElement('span');
    ele.textContent = `{{ ${this.tableName}.${this.fieldName} }}`;
    ele.className = `${DynamicValueClassName} mceNonEditable`;
    ele.setAttribute(DynamicValueAttributeTableName, this.tableName);
    ele.setAttribute(DynamicValueAttributeFieldName, this.fieldName);
    return ele;
  }

  createHtml() {
    const ele = this.createDom();
    return ele.outerHTML;
  }
}
