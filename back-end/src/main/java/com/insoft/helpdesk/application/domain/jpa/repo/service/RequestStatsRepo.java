package com.insoft.helpdesk.application.domain.jpa.repo.service;

import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;


public interface RequestStatsRepo extends JpaRepository<Request, String>, JpaSpecificationExecutor<Request> {

//관리자, 운영자 전체 서비스 통계
    @Query(value = "select ty_cd, count(ty_cd) from tb_help_svc_rqst where regist_dt between :startTime and  :endTime GROUP BY ty_cd", nativeQuery = true)
    List<Map> findByTyCd(@Param(value = "startTime") LocalDateTime startTime, @Param(value = "endTime")  LocalDateTime endTime);

    @Query(value = "select sys_cd, count(sys_cd) from tb_help_svc_rqst where regist_dt between :startTime and  :endTime GROUP BY sys_cd", nativeQuery = true)
    List<Map> findBySysCd(@Param(value = "startTime") LocalDateTime startTime, @Param(value = "endTime")  LocalDateTime endTime);

    @Query(value = "select prcs_stts_cd, count(prcs_stts_cd) from tb_help_svc_rqst where regist_dt between :startTime and  :endTime GROUP BY prcs_stts_cd", nativeQuery = true)
    List<Map> findByPrcsSttsCd(@Param(value = "startTime") LocalDateTime startTime, @Param(value = "endTime")  LocalDateTime endTime);

    @Query(value = "select count(*), case when cast(:end_time as date) - cast(:start_time as date) > 33 then to_char(regist_dt, 'YYYY/MM') else to_char(regist_dt, 'MM/DD') end as regist from tb_help_svc_rqst where regist_dt between :start_time and  :end_time GROUP BY regist ORDER BY regist", nativeQuery = true)
    List<Map> findById(@Param(value = "start_time") LocalDateTime startTime, @Param(value = "end_time")  LocalDateTime endTime);

 //사용자 전체 서비스 통계
    @Query(value = "select ty_cd, count(ty_cd) from tb_help_svc_rqst where sys_cd = (select psitn_instt_cd FROM tb_help_mbr WHERE user_id = :userId ) and regist_dt between :startTime and  :endTime GROUP BY ty_cd", nativeQuery = true)
    List<Map> findByTyCd(@PathVariable(value = "userId") String userId, @Param(value = "startTime") LocalDateTime startTime, @Param(value = "endTime")  LocalDateTime endTime);

    @Query(value = "select sys_cd, count(sys_cd) from tb_help_svc_rqst where sys_cd = (select psitn_instt_cd FROM tb_help_mbr WHERE user_id = :userId ) and regist_dt between :startTime and  :endTime GROUP BY sys_cd", nativeQuery = true)
    List<Map> findBySysCd(@PathVariable(value = "userId") String userId, @Param(value = "startTime") LocalDateTime startTime, @Param(value = "endTime")  LocalDateTime endTime);

    @Query(value = "select prcs_stts_cd, count(prcs_stts_cd) from tb_help_svc_rqst where sys_cd = (select psitn_instt_cd FROM tb_help_mbr WHERE user_id = :userId ) and regist_dt between :startTime and  :endTime GROUP BY prcs_stts_cd", nativeQuery = true)
    List<Map> findByPrcsSttsCd(@PathVariable(value = "userId") String userId, @Param(value = "startTime") LocalDateTime startTime, @Param(value = "endTime")  LocalDateTime endTime);

   @Query(value = "select count(*), case when cast(:endTime as date) - cast(:startTime as date) > 33 then to_char(regist_dt, 'YYYY/MM') else to_char(regist_dt, 'MM/DD') end as regist from tb_help_svc_rqst  where sys_cd = (select psitn_instt_cd FROM tb_help_mbr WHERE user_id = :userId ) and regist_dt between :startTime and  :endTime GROUP BY regist ORDER BY regist", nativeQuery = true)
    List<Map> findById(@PathVariable(value = "userId") String userId, @Param(value = "startTime") LocalDateTime startTime, @Param(value = "endTime")  LocalDateTime endTime);


// 담당자 서비스 통계
    @Query(value = "select A.ty_cd, count(A.ty_cd) from tb_help_svc_rqst as A join tb_help_svc_rqst_charge as B on A.svc_rqst_no  = B.svc_rqst_no where B.user_id = :userId and B.del_yn = 'N' and A.regist_dt between :startTime and  :endTime GROUP BY A.ty_cd", nativeQuery = true)
    List<Map> findByTyCdAndRegistDt(@PathVariable(value = "userId") String userId, @Param(value = "startTime") LocalDateTime startTime, @Param(value = "endTime")  LocalDateTime endTime);

    @Query(value = "select A.sys_cd, count(A.sys_cd) from tb_help_svc_rqst as A join tb_help_svc_rqst_charge as B on A.svc_rqst_no  = B.svc_rqst_no where B.user_id = :userId and B.del_yn = 'N' and A.regist_dt between :startTime and  :endTime GROUP BY A.sys_cd", nativeQuery = true)
    List<Map> findBySysCdAndRegistDt(@PathVariable(value = "userId") String userId, @Param(value = "startTime") LocalDateTime startTime, @Param(value = "endTime")  LocalDateTime endTime);

    @Query(value = "select A.prcs_stts_cd, count(A.prcs_stts_cd) from tb_help_svc_rqst as A join tb_help_svc_rqst_charge as B on A.svc_rqst_no  = B.svc_rqst_no where B.user_id = :userId and B.del_yn = 'N' and A.regist_dt between :startTime and  :endTime GROUP BY A.prcs_stts_cd", nativeQuery = true)
    List<Map> findByPrcsSttsCdAndRegistDt(@PathVariable(value = "userId") String userId, @Param(value = "startTime") LocalDateTime startTime, @Param(value = "endTime")  LocalDateTime endTime);

    @Query(value = "select count(*), case when cast(:endTime as date) - cast(:startTime as date) > 33 then to_char(A.regist_dt, 'YYYY/MM') else to_char(A.regist_dt, 'MM/DD') end as regist from tb_help_svc_rqst as A join tb_help_svc_rqst_charge as B on A.svc_rqst_no  = B.svc_rqst_no where B.user_id = :userId and B.del_yn = 'N' and A.regist_dt between :startTime and  :endTime GROUP BY regist ORDER BY regist", nativeQuery = true)
    List<Map> findByIdOrderByRegistDt(@PathVariable(value = "userId") String userId, @Param(value = "startTime") LocalDateTime startTime, @Param(value = "endTime")  LocalDateTime endTime);


    // 내 요청 카운트
    @Query(value = "select prcs_stts_cd, count(prcs_stts_cd) from tb_help_svc_rqst where rqstr_id = :userId and regist_dt between :startTime and  :endTime GROUP BY prcs_stts_cd", nativeQuery = true)
    List<Map> findByPrcsSttsCdAndReqId(@PathVariable(value = "userId") String userId, @Param(value = "startTime") LocalDateTime startTime, @Param(value = "endTime")  LocalDateTime endTime);

    // 민원 통계
    @Query(value = "select b.regist, sum(case when b.ty_cd = 'debug' then b.cnt end) as debug, sum(case when b.ty_cd = 'function' then b.cnt end) as func, sum(case when b.ty_cd = 'tech' then b.cnt end) as tech, sum(case when b.ty_cd = 'error' then b.cnt end) as error, sum(case when b.ty_cd = 'rqstData' then b.cnt end) as rqstData, sum(case when b.ty_cd = 'etc' then b.cnt end) as etc ,sum(b.cnt) as cnt from (select a.regist, a.ty_cd, a.cnt, a.sys_cd from (select to_char(regist_dt, 'YYYY/MM/dd') as regist, coalesce(count(ty_cd),0) as cnt,ty_cd,sys_cd FROM tb_help_svc_rqst GROUP BY regist,ty_cd,sys_cd) as a ) as b where b.regist between :startTime and :endTime and b.sys_cd in (:items) group by rollup((b.regist)) order by b.regist", nativeQuery = true)
    List<Map> findTyCdAndRegistDt(@Param(value = "startTime") String startTime, @Param(value = "endTime")  String endTime,@Param(value= "items") List<String> items);

    @Query(value = "SELECT sys_cd,ttl,chrgpr_nm,svc_rqst_no,to_char(regist_dt,'YYYY/MM/dd') as regist FROM tb_help_svc_rqst where ty_cd = :selectType and Date(regist_dt) = Date(:selectDate) and sys_cd in (:items)", nativeQuery = true)
    List<Map> findByCount(@Param(value = "selectDate") String selectDate, @Param(value = "selectType")  String selectType, @Param(value= "items") List<String> items);

}
