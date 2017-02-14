package com.grape.models;
// Generated Dec 9, 2016 9:59:15 AM by Hibernate Tools 3.4.0.CR1

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * NcaatableId generated by hbm2java
 */
@Entity
@Table(name = "ncaa_teamtable", catalog = "grape_db")
public class NcaaTeamTable implements java.io.Serializable {

	private String kenPom_nm;
	private String schedule_nm;
    private Integer id;

    @Id
	@Column(name="Team_Id")
    public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "Kenpom_nm", length = 65535)
	public String getKenPomTeamName() {
		return this.kenPom_nm;
	}

	public void setKenPomTeamName(String kenPom_nm) {
		this.kenPom_nm = kenPom_nm;
	}

	@Column(name = "Schedule_nm", length = 65535)
	public String getScheduleTeamName() {
		return this.schedule_nm;
	}

	public void setScheduleTeamName(String schedule_nm) {
		this.schedule_nm = schedule_nm;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof NcaaTeamTable))
			return false;
		NcaaTeamTable castOther = (NcaaTeamTable) other;

		return ((this.getScheduleTeamName() == castOther.getScheduleTeamName()) || (this.getScheduleTeamName() != null
				&& castOther.getScheduleTeamName() != null && this.getScheduleTeamName().equals(
				castOther.getScheduleTeamName())))
				&& ((this.getKenPomTeamName() == castOther.getKenPomTeamName()) || (this.getKenPomTeamName() != null
						&& castOther.getKenPomTeamName() != null && this.getKenPomTeamName()
						.equals(castOther.getKenPomTeamName())))
				&& ((this.getId() == castOther.getId()) || (this.getId() != null
						&& castOther.getId() != null && this.getId()
						.equals(castOther.getId())));
	}

	public int hashCode() {
		int result = 17;
		
		result = 37 * result
				+ (getId() == null ? 0 : this.getId().hashCode());
		result = 37 * result
				+ (getKenPomTeamName() == null ? 0 : this.getKenPomTeamName().hashCode());
		result = 37 * result
				+ (getScheduleTeamName() == null ? 0 : this.getScheduleTeamName().hashCode());
		return result;
	}

}
