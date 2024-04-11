// functionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';
import { ShortUrlInitialValues } from '../../Screens/shortLink/ShortLinkWrapper';
import { FormikProps } from 'formik';


interface FunctionState {
    handleApiCall: ((values: ShortUrlInitialValues) => void) | null;
    loginProps: FormikProps<ShortUrlInitialValues> | null;
}

const initialState: FunctionState = {
    handleApiCall: null,
    loginProps: null,
};

const functionSlice = createSlice({
    name: 'function',
    initialState,
    reducers: {
        setHandleApiCall: (state, action: PayloadAction<FunctionState['handleApiCall']>) => {
            state.handleApiCall = action.payload;
        },
        setLoginProps: (state, action: PayloadAction<FunctionState['loginProps']>) => {
            state.loginProps = action.payload;
        },
    },
});

export const { setHandleApiCall, setLoginProps } = functionSlice.actions;
export default functionSlice.reducer;

export const selectFunctionState = (state: RootState) => state.function;
