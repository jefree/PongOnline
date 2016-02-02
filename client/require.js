function require(module) {
  module = module.split('/').pop();
  if ( !(window.hasOwnProperty(module)) ) {
    throw "module named " + module + "doesnt exists. Did you forget import it ?";
  }

  return window[module];
}
