import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export const Auth = (props: any) => {
  const router = useRouter();

  const isLogin = useSelector((state: any) => state.authSlice.isLogin);

  if (typeof window !== 'undefined' && !isLogin && router.asPath != '/')
    router.push('/');

  return props.children;
};
export default Auth;
