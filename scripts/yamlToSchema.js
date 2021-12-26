/*
Just a proof of concept for not duplicating classes in 
swagger documentation (.yaml) and  mongoose Schema 
*/
const yaml = require('js-yaml');
const fs = require('fs');
const yamlsDir = './db/models/';
const yamlFiles = fs
  .readdirSync(yamlsDir)
  .filter((file) => file.endsWith('.yaml'));
const yamlDocs = yamlFiles.map((f) => yaml.load(fs.readFileSync(yamlsDir + f)));

const openapiToMongooseType = (type) => {
  switch (type) {
    case 'string':
      return 'String';
    default:
      throw new Error(`type ${type} not implemented`);
  }
};

/*
Converts yaml components.schemas objects to mongoose Schema
*/
const getSchema = (name) => {
  const doc = yamlDocs.find((d) => d.components.schemas[name]);

  const parseObject = (object) => {
    if (object['allOf']) {
      // get properties from all objects
      var allProperties = {};
      Object.assign(allProperties, ...object.allOf.map(parseObject));
      return allProperties;
    }
    if (object['type'] == 'object') {
      // do not edit yaml docs
      const properties = JSON.parse(JSON.stringify(object.properties));
      for (const [propName, property] of Object.entries(properties)) {
        property.required = object.required.includes(propName);
        property.type = openapiToMongooseType(property.type);
      }
      return properties;
    }
    if (object['$ref']) {
      const ref = object['$ref'];
      const parts = ref.split('/');
      if (
        parts[0] != '#' &&
        parts[1] != 'components' &&
        parts[2] != 'schemas'
      ) {
        throw new Error(`$ref "${ref}" not implemented!`);
      }
      return getSchema(parts.pop());
    }
  };

  return parseObject(doc.components.schemas[name]);
};

exports.getSchema = getSchema;
