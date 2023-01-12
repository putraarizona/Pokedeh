import { useSearchParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
	//Check URL params for password
	const [searchParams, setSearchParams] = useSearchParams();

	if (searchParams.get('password') !== 'secret') {
		return <Navigate to='/unauthorized' replace />;
	}

	return children; // TODO: replace this
};

export default ProtectedRoute;
