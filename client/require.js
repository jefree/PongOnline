function require(module) {
  module = module.split('/').pop();
  if ( !(window.hasOwnProperty(module)) ) {
    throw "module named " + module + " doesn't exists. Did you forget import it ?";
  }

  return window[module];
}
