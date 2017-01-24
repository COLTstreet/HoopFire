package com.grape.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.grape.dao.impl.NbaScheduleHome;
import com.grape.models.NbaSchedule;

@Component
public class NbaScheduleService {
	
	@Autowired
	private NbaScheduleHome nbaScheduleDao; 	 
	
	@Transactional
	public List<NbaSchedule> getNbaScheduleData(){
		
		return nbaScheduleDao.getNbaSchedule();
	}

}
