package com.grape.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.grape.dao.impl.NbaInjuryHome;
import com.grape.models.NbaInjury;

@Component
public class NbaInjuryService {
	
	@Autowired
	private NbaInjuryHome nbaInjuryDao; 	 
	
	@Transactional
	public List<NbaInjury> getNbaInjuryData(){
		
		return nbaInjuryDao.getNbaInjuries();
	}

}
