import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../APIs/api';
const URL = 'http://localhost:2001';

const initialState = {

  data_Price: [],
  data_SuiteMaxMin: [],
  data_ProbableLine: [],
  data_TrendLines: [],
  data_SMA: [],
  data_EliottWaves: [],
  data_Fibonacci: [],
  data_EliottWavesR: [],
  data_RoundNumbers: [],
  data_PointsPerLine: [],
  data_LineByPoints: [],
  data_CorrelationZone: [],
  data_ProTrends: [],
  data_LineDouble: [],
  data_MainCalcule: [],

  status_Price: 'idle',
  status_SuiteMaxMin: 'idle',
  status_ProbableLine: 'idle',
  status_TrendLines: 'idle',
  status_SMA: 'idle',
  status_EliottWaves: 'idle',
  status_Fibonacci: 'idle',
  status_EliottWavesR: 'idle',
  status_RoundNumbers: 'idle',
  status_PointsPerLine: 'idle',
  status_LineByPoints: 'idle',
  status_CorrelationZone: 'idle',
  status_ProTrends: 'idle',
  status_LineDouble: 'idle',
  status_MainCalcule: 'idle',

  parameters: [],
  error: null
}


export const fetchMainCalcule = createAsyncThunk('starter/getMainCalcule', async (params) => {
  let response = await API.post(URL + '/starter/getMainCalcule', params)
  return response.data
})
export const fetchPrice = createAsyncThunk('starter/getPrice', async (params) => {
  let response = await API.post(URL + '/starter/getPrice', params)
  return response.data
})
export const fetchSuiteMaxMin = createAsyncThunk('starter/getSuiteMaxMin', async (params) => {
  let response = await API.post(URL + '/starter/getSuiteMaxMin', params)
  return response.data
})
export const fetchProbableLine = createAsyncThunk('starter/getProbableLine', async (params) => {
  let response = await API.post(URL + '/starter/getProbableLine', params)
  return response.data
})
export const fetchTrendLines = createAsyncThunk('starter/getTrendLines', async (params) => {
  let response = await API.post(URL + '/starter/getTrendLines', params)
  return response.data
})
export const fetchSMA = createAsyncThunk('starter/getSMA', async (params) => {
  let response = await API.post(URL + '/starter/getSMA', params)
  return response.data
})
export const fetchEliottWaves = createAsyncThunk('starter/getEliottWaves', async (params) => {
  let response = await API.post(URL + '/starter/getEliottWaves', params)
  return response.data
})
export const fetchFibonacci = createAsyncThunk('starter/getFibonacci', async (params) => {
  let response = await API.post(URL + '/starter/getFibonacci', params)
  return response.data
})
export const fetchEliottWavesR = createAsyncThunk('starter/getEliottWavesR', async (params) => {
  let response = await API.post(URL + '/starter/getEliottWavesR', params)
  return response.data
})
export const fetchRoundNumbers = createAsyncThunk('starter/getRoundNumbers', async (params) => {
  let response = await API.post(URL + '/starter/getRoundNumbers', params)
  return response.data
})
export const fetchPointsPerLine = createAsyncThunk('starter/getPointsPerLine', async (params) => {
  let response = await API.post(URL + '/starter/getPointsPerLine', params)
  return response.data
})
export const fetchLineByPoints = createAsyncThunk('starter/getLineByPoints', async (params) => {
  let response = await API.post(URL + '/starter/getLineByPoints', params)
  return response.data
})
export const fetchCorrelationZone = createAsyncThunk('starter/getCorrelationZone', async (params) => {
  let response = await API.post(URL + '/starter/getCorrelationZone', params)
  return response.data
})
export const fetchProTrends = createAsyncThunk('starter/getProTrends', async (params) => {
  let response = await API.post(URL + '/starter/getProTrends', params)
  return response.data
})
export const fetchLineDouble = createAsyncThunk('starter/getLineDouble', async (params) => {
  let response = await API.post(URL + '/starter/getLineDouble', params)
  return response.data
})



export const dataFlowSlice = createSlice({
  name: 'dataFlow',
  initialState,
  reducers: {
    changeStatue: (state) => {
      state.status_MainCalcule = 'idle'
    }
  },
  //handle actions in extraReducers:
  extraReducers: (builder) => {
    builder
      // Fetch MainCalcule
      .addCase(fetchMainCalcule.pending, (state, action) => {
        state.status_MainCalcule = 'loading'
      })
      .addCase(fetchMainCalcule.fulfilled, (state, action) => {
        state.status_MainCalcule = 'succeeded'
        state.data_MainCalcule = action.payload
      })
      .addCase(fetchMainCalcule.rejected, (state, action) => {
        state.status_MainCalcule = 'failed'
        state.error = action.error.message
      })
      // Fetch Price
      .addCase(fetchPrice.pending, (state, action) => {
        state.status_Price = 'loading'
      })
      .addCase(fetchPrice.fulfilled, (state, action) => {
        state.status_Price = 'succeeded'
        state.data_Price = action.payload
      })
      .addCase(fetchPrice.rejected, (state, action) => {
        state.status_Price = 'failed'
        state.error = action.error.message
      })
      // Fetch SuiteMaxMin
      .addCase(fetchSuiteMaxMin.pending, (state, action) => {
        state.status_SuiteMaxMin = 'loading'
      })
      .addCase(fetchSuiteMaxMin.fulfilled, (state, action) => {
        state.status_SuiteMaxMin = 'succeeded'
        state.data_SuiteMaxMin = action.payload
      })
      .addCase(fetchSuiteMaxMin.rejected, (state, action) => {
        state.status_SuiteMaxMin = 'failed'
        state.error = action.error.message
      })
      // Fetch ProbableLine
      .addCase(fetchProbableLine.pending, (state, action) => {
        state.status_ProbableLine = 'loading'
      })
      .addCase(fetchProbableLine.fulfilled, (state, action) => {
        state.status_ProbableLine = 'succeeded'
        state.data_ProbableLine = action.payload
      })
      .addCase(fetchProbableLine.rejected, (state, action) => {
        state.status_ProbableLine = 'failed'
        state.error = action.error.message
      })
      // Fetch TrendLines
      .addCase(fetchTrendLines.pending, (state, action) => {
        state.status_TrendLines = 'loading'
      })
      .addCase(fetchTrendLines.fulfilled, (state, action) => {
        state.status_TrendLines = 'succeeded'
        state.data_TrendLines = action.payload
      })
      .addCase(fetchTrendLines.rejected, (state, action) => {
        state.status_TrendLines = 'failed'
        state.error = action.error.message
      })
      // Fetch SMA
      .addCase(fetchSMA.pending, (state, action) => {
        state.status_SMA = 'loading'
      })
      .addCase(fetchSMA.fulfilled, (state, action) => {
        state.status_SMA = 'succeeded'
        state.data_SMA = action.payload
      })
      .addCase(fetchSMA.rejected, (state, action) => {
        state.status_SMA = 'failed'
        state.error = action.error.message
      })
      // Fetch EliottWaves
      .addCase(fetchEliottWaves.pending, (state, action) => {
        state.status_EliottWaves = 'loading'
      })
      .addCase(fetchEliottWaves.fulfilled, (state, action) => {
        state.status_EliottWaves = 'succeeded'
        state.data_EliottWaves = action.payload
      })
      .addCase(fetchEliottWaves.rejected, (state, action) => {
        state.status_EliottWaves = 'failed'
        state.error = action.error.message
      })
      // Fetch Fibonacci
      .addCase(fetchFibonacci.pending, (state, action) => {
        state.status_Fibonacci = 'loading'
      })
      .addCase(fetchFibonacci.fulfilled, (state, action) => {
        state.status_Fibonacci = 'succeeded'
        state.data_Fibonacci = action.payload
      })
      .addCase(fetchFibonacci.rejected, (state, action) => {
        state.status_Fibonacci = 'failed'
        state.error = action.error.message
      })
      // Fetch EliottWavesR
      .addCase(fetchEliottWavesR.pending, (state, action) => {
        state.status_EliottWavesR = 'loading'
      })
      .addCase(fetchEliottWavesR.fulfilled, (state, action) => {
        state.status_EliottWavesR = 'succeeded'
        state.data_EliottWavesR = action.payload
      })
      .addCase(fetchEliottWavesR.rejected, (state, action) => {
        state.status_EliottWavesR = 'failed'
        state.error = action.error.message
      })
      // Fetch RoundNumbers
      .addCase(fetchRoundNumbers.pending, (state, action) => {
        state.status_RoundNumbers = 'loading'
      })
      .addCase(fetchRoundNumbers.fulfilled, (state, action) => {
        state.status_RoundNumbers = 'succeeded'
        state.data_RoundNumbers = action.payload
      })
      .addCase(fetchRoundNumbers.rejected, (state, action) => {
        state.status_RoundNumbers = 'failed'
        state.error = action.error.message
      })
      // Fetch PointsPerLine
      .addCase(fetchPointsPerLine.pending, (state, action) => {
        state.status_PointsPerLine = 'loading'
      })
      .addCase(fetchPointsPerLine.fulfilled, (state, action) => {
        state.status_PointsPerLine = 'succeeded'
        state.data_PointsPerLine = action.payload
      })
      .addCase(fetchPointsPerLine.rejected, (state, action) => {
        state.status_PointsPerLine = 'failed'
        state.error = action.error.message
      })
      // Fetch LineByPoints
      .addCase(fetchLineByPoints.pending, (state, action) => {
        state.status_LineByPoints = 'loading'
      })
      .addCase(fetchLineByPoints.fulfilled, (state, action) => {
        state.status_LineByPoints = 'succeeded'
        state.data_LineByPoints = action.payload
      })
      .addCase(fetchLineByPoints.rejected, (state, action) => {
        state.status_LineByPoints = 'failed'
        state.error = action.error.message
      })
      // Fetch CorrelationZone
      .addCase(fetchCorrelationZone.pending, (state, action) => {
        state.status_CorrelationZone = 'loading'
      })
      .addCase(fetchCorrelationZone.fulfilled, (state, action) => {
        state.status_CorrelationZone = 'succeeded'
        state.data_CorrelationZone = action.payload
      })
      .addCase(fetchCorrelationZone.rejected, (state, action) => {
        state.status_CorrelationZone = 'failed'
        state.error = action.error.message
      })
      // Fetch ProTrends
      .addCase(fetchProTrends.pending, (state, action) => {
        state.status_ProTrends = 'loading'
      })
      .addCase(fetchProTrends.fulfilled, (state, action) => {
        state.status_ProTrends = 'succeeded'
        state.data_ProTrends = action.payload
      })
      .addCase(fetchProTrends.rejected, (state, action) => {
        state.status_ProTrends = 'failed'
        state.error = action.error.message
      })
      // Fetch LineDouble
      .addCase(fetchLineDouble.pending, (state, action) => {
        state.status_LineDouble = 'loading'
      })
      .addCase(fetchLineDouble.fulfilled, (state, action) => {
        state.status_LineDouble = 'succeeded'
        state.data_LineDouble = action.payload
      })
      .addCase(fetchLineDouble.rejected, (state, action) => {
        state.status_LineDouble = 'failed'
        state.error = action.error.message
      })
      

  }
})

// Action creators are generated for each case reducer function
export const getPrice = (state) => state.dataFlow.data_Price;
export const getSuiteMaxMin = (state) => state.dataFlow.data_SuiteMaxMin;
export const getProbableLine = (state) => state.dataFlow.data_ProbableLine;
export const getTrendLines = (state) => state.dataFlow.data_TrendLines;
export const getSMA = (state) => state.dataFlow.data_SMA;
export const getEliottWaves = (state) => state.dataFlow.data_EliottWaves;
export const getFibonacci = (state) => state.dataFlow.data_Fibonacci;
export const getEliottWavesR = (state) => state.dataFlow.data_EliottWavesR;
export const getRoundNumbers = (state) => state.dataFlow.data_RoundNumbers;
export const getPointsPerLine = (state) => state.dataFlow.data_PointsPerLine;
export const getLineByPoints = (state) => state.dataFlow.data_LineByPoints;
export const getCorrelationZone = (state) => state.dataFlow.data_CorrelationZone;
export const getProTrends = (state) => state.dataFlow.data_ProTrends;
export const getLineDouble = (state) => state.dataFlow.data_LineDouble;
export const getMainCalcule = (state) => state.dataFlow.data_MainCalcule;

export const getPriceStatus = (state) => state.dataFlow.status_Price;
export const getSuiteMaxMinStatus = (state) => state.dataFlow.status_SuiteMaxMin;
export const getProbableLineStatus = (state) => state.dataFlow.status_ProbableLine;
export const getTrendLinesStatus = (state) => state.dataFlow.status_TrendLines;
export const getSMAStatus = (state) => state.dataFlow.status_SMA;
export const getEliottWavesStatus = (state) => state.dataFlow.status_EliottWaves;
export const getFibonacciStatus = (state) => state.dataFlow.status_Fibonacci;
export const getEliottWavesRStatus = (state) => state.dataFlow.status_EliottWavesR;
export const getRoundNumbersStatus = (state) => state.dataFlow.status_RoundNumbers;
export const getPointsPerLineStatus = (state) => state.dataFlow.status_PointsPerLine;
export const getLineByPointsStatus = (state) => state.dataFlow.status_LineByPoints;
export const getCorrelationZoneStatus = (state) => state.dataFlow.status_CorrelationZone;
export const getProTrendsStatus = (state) => state.dataFlow.status_ProTrends;
export const getLineDoubleStatus = (state) => state.dataFlow.status_LineDouble;
export const getMainCalculeStatus = (state) => state.dataFlow.status_MainCalcule;

export const { changeStatue } = dataFlowSlice.actions

export default dataFlowSlice.reducer