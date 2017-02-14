package com.grape.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.grape.dao.impl.NcaaTeamTableHome;
import com.grape.dao.impl.NcaatableHome;
import com.grape.models.Nbatable;
import com.grape.models.NcaaTeamTable;
import com.grape.models.Ncaatable;

@Component
public class NcaaTeamTableService {
	
	@Autowired
	private NcaaTeamTableHome ncaaTeamTableDao; 	 
	
	@Transactional
	public List<NcaaTeamTable> getNcaaTeamTableData(){
		
		return ncaaTeamTableDao.getAll();
	}

}
