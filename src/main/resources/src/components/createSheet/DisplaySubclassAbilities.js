import React, { useState, useEffect } from 'react';
import { getSubclassFeatures } from './services/apiService';

const [subclassFeatures, setSubclassFeatures] = useState([]);

export const getSubclassAbilities = async (className, subclass) => {

	try {
		setSubclassFeatures([]);

		const response = await getSubclassFeatures(className, subclass);

		const features = response.subclassFeature.map((feature) => ({

			name: feature.name,
			level: feature.level,
			description: feature.entries,
		}));

		setSubclassFeatures(features);

	} catch (error) {
		console.error(error)
	}

}