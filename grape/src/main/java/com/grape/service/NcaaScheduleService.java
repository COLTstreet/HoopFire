package com.grape.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.grape.dao.impl.NcaaScheduleHome;
import com.grape.models.NcaaSchedule;

@Component
public class NcaaScheduleService {
	
	@Autowired
	private NcaaScheduleHome ncaaScheduleDao; 	 
	
	@Transactional
	public List<NcaaSchedule> getNcaaScheduleData(){
		
		return ncaaScheduleDao.getNcaaSchedule();
	}

}
