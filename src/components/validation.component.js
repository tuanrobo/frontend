import React from 'react';
import { Field, getIn } from 'formik';


const ErrorMessage = ({ name }) => (
	<Field
	  name={name}
	>
		{({form}) => {
			const error = getIn(form.errors, name);
			const touch = getIn(form.touched, name);
			return touch && error ?  <div className = "alert alert-warning w-100 mt-2">{error}</div> : null;			
		}}

	</Field>
  );

export default ErrorMessage
