import { AuthStackParamList } from '@_types/authStack';
import { NavigationProp, useNavigation, useRoute, RouteProp } from '@react-navigation/native';

type FindInfoRouteProp = RouteProp<AuthStackParamList, "FindInfo">;

const useLoginNavigation = () => {

    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
    const route = useRoute<FindInfoRouteProp>();
    const { mode: rawMode = 'id' } = route.params || {};

    const mode = rawMode === 'id' || rawMode === 'password' ? rawMode : 'id';

    const isId = mode === 'id';

    const isPassword = mode === 'password';

    return {
        navigation,
        route,
        mode,
        isId,
        isPassword
    }
}

export default useLoginNavigation