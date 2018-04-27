//外部依赖包
import React from 'react';
import PropTypes from 'prop-types';
//内部依赖包
import loading from 'src/libs/saga-model-plugins/loading';
import Container from 'src/view';
import Provider from 'libs/provider/saga-model-provider';
import modelList from 'src/model-list';

class ModelRegister extends React.Component {
  static contextTypes = {
    sagaStore: PropTypes.object,
  };
  displayName = 'ModelRegister';
  state = {};
  registerModel = register => {
    return Promise.all(modelList).then(models => {
      models.forEach(m => {
        register(m);
      });
    });
  };
  componentDidMount() {
    this.registerModel(this.context.sagaStore.register).then(() => {
      this.setState({
        canBeRendered: true,
      });
    });
  }
  render() {
    const { children } = this.props;
    if (this.state.canBeRendered) {
      return children;
    } else {
      return false;
    }
  }
}

export default class App extends React.Component {
  render() {
    return (
      <Provider
        production={true}
        plugins={[
          loading,
          {
            onError: (error, dispatch) => {
              console.error(error);
            },
          },
        ]}
      >
        <ModelRegister>
          <Container />
        </ModelRegister>
      </Provider>
    );
  }
}
