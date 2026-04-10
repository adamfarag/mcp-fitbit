import { z } from 'zod';
import { makeFitbitRequest } from './utils.js';
const FITBIT_API_BASE = 'https://api.fitbit.com/1';

export function registerHealthMetricsTools(server, getAccessTokenFn) {
    // --- HRV by Date ---
    server.tool('get_hrv', "Get Heart Rate Variability (HRV) data from Fitbit for a specific date. Returns dailyRmssd and deepRmssd values. Requires 'date' in YYYY-MM-DD format.", {
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format.').describe('The date for which to retrieve HRV data (YYYY-MM-DD).')
    }, async ({ date }) => {
        const data = await makeFitbitRequest(`hrv/date/${date}.json`, getAccessTokenFn, FITBIT_API_BASE);
        if (!data) return { content: [{ type: 'text', text: `Failed to retrieve HRV data for '${date}'. Check token and permissions.` }], isError: true };
        return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
    });

    // --- HRV by Date Range ---
    server.tool('get_hrv_by_date_range', "Get Heart Rate Variability (HRV) data from Fitbit for a date range. Returns dailyRmssd and deepRmssd values per day.", {
        startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Start date must be in YYYY-MM-DD format.').describe('Start date (YYYY-MM-DD).'),
        endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'End date must be in YYYY-MM-DD format.').describe('End date (YYYY-MM-DD).')
    }, async ({ startDate, endDate }) => {
        const data = await makeFitbitRequest(`hrv/date/${startDate}/${endDate}.json`, getAccessTokenFn, FITBIT_API_BASE);
        if (!data) return { content: [{ type: 'text', text: `Failed to retrieve HRV data for range '${startDate}' to '${endDate}'.` }], isError: true };
        return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
    });

    // --- SpO2 by Date ---
    server.tool('get_spo2', "Get blood oxygen saturation (SpO2) data from Fitbit for a specific date. Requires oxygen_saturation scope.", {
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format.').describe('The date for which to retrieve SpO2 data (YYYY-MM-DD).')
    }, async ({ date }) => {
        const data = await makeFitbitRequest(`spo2/date/${date}.json`, getAccessTokenFn, FITBIT_API_BASE);
        if (!data) return { content: [{ type: 'text', text: `Failed to retrieve SpO2 data for '${date}'. Check token and oxygen_saturation scope.` }], isError: true };
        return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
    });

    // --- Breathing Rate by Date ---
    server.tool('get_breathing_rate', "Get breathing rate data from Fitbit for a specific date. Returns average breaths per minute during sleep. Requires respiratory_rate scope.", {
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format.').describe('The date for which to retrieve breathing rate data (YYYY-MM-DD).')
    }, async ({ date }) => {
        const data = await makeFitbitRequest(`br/date/${date}.json`, getAccessTokenFn, FITBIT_API_BASE);
        if (!data) return { content: [{ type: 'text', text: `Failed to retrieve breathing rate data for '${date}'. Check token and respiratory_rate scope.` }], isError: true };
        return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
    });

    // --- Skin Temperature by Date ---
    server.tool('get_skin_temperature', "Get skin temperature data from Fitbit for a specific date. Returns relative temperature variation from baseline. Requires temperature scope.", {
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format.').describe('The date for which to retrieve skin temperature data (YYYY-MM-DD).')
    }, async ({ date }) => {
        const data = await makeFitbitRequest(`temp/skin/date/${date}.json`, getAccessTokenFn, FITBIT_API_BASE);
        if (!data) return { content: [{ type: 'text', text: `Failed to retrieve skin temperature data for '${date}'. Check token and temperature scope.` }], isError: true };
        return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
    });

    // --- Cardio Fitness Score (VO2 Max) by Date Range ---
    server.tool('get_cardio_fitness', "Get cardio fitness score (VO2 Max) data from Fitbit for a date range. Requires cardio_fitness scope.", {
        startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Start date must be in YYYY-MM-DD format.').describe('Start date (YYYY-MM-DD).'),
        endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'End date must be in YYYY-MM-DD format.').describe('End date (YYYY-MM-DD).')
    }, async ({ startDate, endDate }) => {
        const data = await makeFitbitRequest(`cardioscore/date/${startDate}/${endDate}.json`, getAccessTokenFn, FITBIT_API_BASE);
        if (!data) return { content: [{ type: 'text', text: `Failed to retrieve cardio fitness data for range '${startDate}' to '${endDate}'.` }], isError: true };
        return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
    });
}
