import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearAuthError } from '../slices/authSlice';
import { RootState } from '../../../app/store';
import { useToast } from '../../../components/ToastProvider';

interface UseAuthEffectsProps {
  successMessage: string;
  redirectPath?: string;
}

export const useAuthEffects = ({
  successMessage,
  redirectPath = '/dashboard',
}: UseAuthEffectsProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const authError = useSelector((state: RootState) => state.auth.error);
  const { showToast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      showToast(successMessage, 'success');
      navigate(redirectPath);
    }
  }, [isAuthenticated, navigate, showToast, successMessage, redirectPath]);

  useEffect(() => {
    if (authError) {
      showToast(authError, 'error');
      dispatch(clearAuthError());
    }
  }, [authError, showToast, dispatch]);

  return { isAuthenticated, authError };
};
