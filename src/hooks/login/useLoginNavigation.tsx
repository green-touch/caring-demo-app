import { AuthStackParamList } from '@_types/authStack';
import { NavigationProp, useNavigation, useRoute, RouteProp } from '@react-navigation/native';

type FindIdRouteProp = RouteProp<AuthStackParamList, "FindInfo">;

const useLoginNavigation = () => {

    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
    const route = useRoute<FindIdRouteProp>();
    const { mode } = route.params;

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