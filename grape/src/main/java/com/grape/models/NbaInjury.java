package com.grape.models;
// Generated Dec 9, 2016 9:59:15 AM by Hibernate Tools 3.4.0.CR1


import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * NbatableId generated by hbm2java
 */
@Entity
@Table(name = "nba_injtable", catalog = "grape_db")
public class NbaInjury  implements java.io.Serializable {


     private Integer injuryId;
     private String team;
     private String player;
     private String date;
     private String type;
     private String note;

    @Id
    @Column(name="InjuryId")
    public Integer getInjuryId() {
		return injuryId;
	}

	public void setInjuryId(Integer injuryId) {
		this.injuryId = injuryId;
	}

	@Column(name="Team", length=65535)
    public String getTeam() {
        return this.team;
    }
    
    public void setTeam(String team) {
        this.team = team;
    }

    @Column(name="Player")
    public String getPlayer() {
        return this.player;
    }
    
    public void setPlayer(String player) {
        this.player = player;
    }

    @Column(name="Date")
    public String getDate() {
        return this.date;
    }
    
    public void setDate(String date) {
        this.date = date;
    }
    
    @Column(name="Type")
    public String getType() {
        return this.type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    @Column(name="Note")
    public String getNote() {
        return this.note;
    }
    
    public void setNote(String note) {
        this.note = note;
    }


   public boolean equals(Object other) {
         if ( (this == other ) ) return true;
		 if ( (other == null ) ) return false;
		 if ( !(other instanceof NbaInjury) ) return false;
		 NbaInjury castOther = ( NbaInjury ) other; 
         
		 return ( (this.getInjuryId()==castOther.getInjuryId()) || ( this.getInjuryId()!=null && castOther.getInjuryId()!=null && this.getInjuryId().equals(castOther.getInjuryId()) ) )
 && ( (this.getTeam()==castOther.getTeam()) || ( this.getTeam()!=null && castOther.getTeam()!=null && this.getTeam().equals(castOther.getTeam()) ) )
 && ( (this.getPlayer()==castOther.getPlayer()) || ( this.getPlayer()!=null && castOther.getPlayer()!=null && this.getPlayer().equals(castOther.getPlayer()) ) )
 && ( (this.getDate()==castOther.getDate()) || ( this.getDate()!=null && castOther.getDate()!=null && this.getDate().equals(castOther.getDate()) ) )
 && ( (this.getType()==castOther.getType()) || ( this.getType()!=null && castOther.getType()!=null && this.getType().equals(castOther.getType()) ) )
 && ( (this.getNote()==castOther.getNote()) || ( this.getNote()!=null && castOther.getNote()!=null && this.getNote().equals(castOther.getNote()) ) );
   }
   
   public int hashCode() {
         int result = 17;
         
         result = 37 * result + ( getInjuryId() == null ? 0 : this.getInjuryId().hashCode() );
         result = 37 * result + ( getTeam() == null ? 0 : this.getTeam().hashCode() );
         result = 37 * result + ( getPlayer() == null ? 0 : this.getPlayer().hashCode() );
         result = 37 * result + ( getDate() == null ? 0 : this.getDate().hashCode() );
         result = 37 * result + ( getType() == null ? 0 : this.getType().hashCode() );
         result = 37 * result + ( getNote() == null ? 0 : this.getNote().hashCode() );
         return result;
   }   


}


