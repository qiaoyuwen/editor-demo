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
    ele.className = 'custom-dynamic-value';
    return ele;
  }

  createHtml() {
    const ele = this.createDom();
    return ele.outerHTML;
  }
}
