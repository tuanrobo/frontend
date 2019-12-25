import { FieldProps } from "formik";
import React from "react";
import Select, { components } from "react-select";
import { OptionsType, ValueType } from "react-select/src/types";

interface Option {
	label: string;
	value: string;
}

interface CustomSelectProps extends FieldProps {
	options: OptionsType<Option>;
	isMulti?: boolean;
	className?: string;
	placeholder?: string;
}


export const CustomSelectField = ({
	className,
	placeholder,
	field,
	form,
	options,
	isMulti = false
}: CustomSelectProps) => {
	

	const onChange = (option: ValueType<Option | Option[]>) => {
		form.setFieldValue(
			field.name,
			isMulti
				? (option as Option[]).map((item: Option) => item.value)
				: (option as Option).value
		);
	};

	const getValue = () => {
		if (options) {
			return isMulti
				? options.filter(option => field.value.indexOf(option.value) >= 0)
				: options.find(option => option.value === field.value);
		} else {
			return isMulti ? [] : ("" as any);
		}
	};

	const Option = (props: any) => {
		return (
			<components.Option {...props}>
				<div className="d-flex align-items-center justify-content-between w-100">
					<div>{props.data.label}</div>
					<small className="text-muted">{props.data.subLabel}</small>
				</div>
			</components.Option>
		);
	};

	const customStyles = {
		menu: (provided: any, state: { selectProps: { width: any; menuColor: any; }; }) => ({
		  ...provided,
		  width: state.selectProps.width,			
		  borderBottom: '0px dotted pink',
		  color: state.selectProps.menuColor,
		//   padding: 20,
		}),
	  
		control: (_: any, { selectProps: { width }}: any) => ({
		  width: width
		}),
	  
		singleValue: (provided: any, state: { isDisabled: any; }) => {
		  const opacity = state.isDisabled ? 0.5 : 1;
		  const transition = 'opacity 300ms';
	  
		  return { ...provided, opacity, transition };
		}
	  }

	return (

		<Select
			styles={customStyles}
			width = "100%"
			className={className}
			
			components={
				{
					DropdownIndicator: () => null,
					IndicatorSeparator: () => null,
					Option
				}
			}
			name={field.name}
			value={getValue()}
			onChange={onChange}
			placeholder={placeholder}
			options={options}
			isMulti={isMulti}
			isSearchable
			menuList
		/>
	);
};

export default CustomSelectField;
