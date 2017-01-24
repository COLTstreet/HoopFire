package com.grape.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.grape.dao.impl.NbatableHome;
import com.grape.models.NbaSchedule;
import com.grape.models.Nbatable;

@Component
public class NbaTableService {
	
	@Autowired
	private NbatableHome nbaTableDao; 	 
	
	@Transactional
	public List<Nbatable> getNbaTableData(){
		
		return nbaTableDao.getAll();
	}
	
	@Transactional
	public List<Nbatable> getNbaTableViewData(){
		
		return nbaTableDao.getNbaView();
	}

}
