import React from 'react';

function createContainer(useHook) {
  var Context = React.createContext(null);
  var Consumer = Context.Consumer;

  function Provider(props) {
    var value = useHook(props.initialState);
    return React.createElement(Context.Provider, {
      value: value
    }, props.children);
  }

  function useContainer() {
    var value = React.useContext(Context);

    if (value === null) {
      throw new Error("Component must be wrapped with <Container.Provider>");
    }

    return value;
  }

  var connect = function (mapper) { return function (SuperComponent) {
    return function (props) { return React.createElement(Consumer, null, function (context) { return React.createElement(SuperComponent, Object.assign({}, props, mapper(context))); }); };
  }; };

  return {
    Context: Context,
    Consumer: Consumer,
    Provider: Provider,
    useContainer: useContainer,
    connect: connect
  };
}
function useContainer(container) {
  return container.useContainer();
}

export { createContainer, useContainer };
//# sourceMappingURL=unstated-next.mjs.map
