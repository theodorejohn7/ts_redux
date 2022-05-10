import { TypedUseSelectorHook } from "react-redux";

import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";

import type { RootState } from "../store";

import type { AppDispatch } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppselector: TypedUseSelectorHook<RootState> = useSelector;
