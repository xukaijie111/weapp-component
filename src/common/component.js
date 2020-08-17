
import {
  safeMerge
} from './util'

function SqbComponent(config){
  var defaultConfig = {
    externalClasses: ['custom-class'],
    properties: {
      customStyle: String,
    },
  }

  config.externalClasses = config.externalClasses || [];
  config.externalClasses = config.externalClasses.concat(defaultConfig.externalClasses);

  config.properties = config.properties || [];
  config.properties = safeMerge(config.properties,defaultConfig.properties);

  return Component(config) 

}

export default SqbComponent;