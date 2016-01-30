function require(module) {
  module = module.split('/').pop();
  if ( !(module in window) ) {
    throw "module named " + module + "doesnt exists. Did you forget import it ?";
  }

  return window[module];
}
