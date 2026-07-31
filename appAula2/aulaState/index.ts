import { registerRootComponent } from 'expo';

import App from './App';
import Mensagem from './src/components/Mensagem';
import Curtida from './src/components/Curtir';
import Contador from './src/components/Contador';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Contador);
