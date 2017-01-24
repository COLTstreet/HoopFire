package com.grape.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.grape.models.NbaInjury;
import com.grape.models.NbaSchedule;
import com.grape.models.Nbatable;
import com.grape.models.Ncaatable;
import com.grape.service.NbaInjuryService;
import com.grape.service.NbaScheduleService;
import com.grape.service.NbaTableService;
import com.grape.service.NcaaTableService;

@Controller
public class RestController {
	
	@Autowired
	private NbaTableService nbaTableService; 
	
	@Autowired
	private NcaaTableService ncaaTableService; 
	
	@Autowired
	private NbaScheduleService nbaScheduleService; 
	
	@Autowired
	private NbaInjuryService nbaInjuryService; 
	
	@RequestMapping(value="/getNbaTableData", method=RequestMethod.GET)
	@ResponseBody 
	public Map<String, Object> getNbaTableData(){
		
		Map<String, Object> response = new HashMap<String, Object>();
		List<Nbatable> nbaTable = new ArrayList<Nbatable>();  
		String result="";
		try{
				
				nbaTable = nbaTableService.getNbaTableData();
				result="SUCCESS";
			}
			
			catch(Exception e){
				result="FAILURE";
			} 
		
		response.put("nbaTable", nbaTable);
		response.put("result", result);
		
		
		return response;
	}
	
	@RequestMapping(value="/getNcaaTableData", method=RequestMethod.GET)
	@ResponseBody 
	public Map<String, Object> getNcaaTableData(){
		
		Map<String, Object> response = new HashMap<String, Object>();
		List<Ncaatable> ncaaTable = new ArrayList<Ncaatable>();  
		String result="";
		try{
				
			ncaaTable = ncaaTableService.getNcaaTableData();
				result="SUCCESS";
			}
			
			catch(Exception e){
				result="FAILURE";
			} 
		
		response.put("ncaaTable", ncaaTable);
		response.put("result", result);
		
		
		return response;
	}
	
	@RequestMapping(value="/getNbaViewData", method=RequestMethod.GET)
	@ResponseBody 
	public Map<String, Object> getNbaViewData(){
		
		Map<String, Object> response = new HashMap<String, Object>();
		List<Nbatable> nbatable = new ArrayList<Nbatable>();  
		String result="";
		try{
				
			nbatable = nbaTableService.getNbaTableViewData();
				result="SUCCESS";
			}
			
			catch(Exception e){
				result="FAILURE";
			} 
		
		response.put("nbatable", nbatable);
		response.put("result", result);
		
		
		return response;
	}
	
	@RequestMapping(value="/getNbaScheduleData", method=RequestMethod.GET)
	@ResponseBody 
	public Map<String, Object> getNbaSchedule(){
		
		Map<String, Object> response = new HashMap<String, Object>();
		List<NbaSchedule> nbaSchedule = new ArrayList<NbaSchedule>();  
		String result="";
		try{
				
			nbaSchedule = nbaScheduleService.getNbaScheduleData();
				result="SUCCESS";
			}
			
			catch(Exception e){
				result="FAILURE";
			} 
		
		response.put("nbaSchedule", nbaSchedule);
		response.put("result", result);
		
		
		return response;
	}
	
	@RequestMapping(value="/getNbaInjuries", method=RequestMethod.GET)
	@ResponseBody 
	public Map<String, Object> getNbaInjuries(){
		
		Map<String, Object> response = new HashMap<String, Object>();
		List<NbaInjury> nbaInjuries = new ArrayList<NbaInjury>();  
		String result="";
		try{
				
			nbaInjuries = nbaInjuryService.getNbaInjuryData();
				result="SUCCESS";
			}
			
			catch(Exception e){
				result="FAILURE";
			} 
		
		response.put("nbaInjuries", nbaInjuries);
		response.put("result", result);
		
		
		return response;
	}
}
