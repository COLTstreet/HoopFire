package com.grape.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.grape.dao.impl.NcaatableHome;
import com.grape.models.Nbatable;
import com.grape.models.Ncaatable;

@Component
public class NcaaTableService {
	
	@Autowired
	private NcaatableHome ncaaTableDao; 	 
	
	@Transactional
	public List<Ncaatable> getNcaaTableData(){
		
		return ncaaTableDao.getAll();
	}

}
