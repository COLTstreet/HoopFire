package com.grape.dao.impl;
// Generated Dec 9, 2016 9:59:15 AM by Hibernate Tools 3.4.0.CR1

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.grape.models.NbaInjury;

/**
 * Home object for domain model class NbaSchedule.
 * @see .Nbatable
 * @author Hibernate Tools
 */
@Repository
@Component
public class NbaInjuryHome {

	private static final Log log = LogFactory.getLog(NbaScheduleHome.class);

	@PersistenceContext(unitName = "grapeCore")
	@Qualifier(value = "entityManagerFactory")
	private EntityManager entityManager;

	public void persist(NbaInjury transientInstance) {
		log.debug("persisting Nbainjury instance");
		try {
			entityManager.persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}
	
	public List<NbaInjury> getNbaInjuries() {
		try {
			Query query = entityManager.createQuery("from NbaInjury");
			return (List<NbaInjury>)query.getResultList();
		} catch(Exception e){
			System.out.println(e);
		}
		return null;
	} 
}
