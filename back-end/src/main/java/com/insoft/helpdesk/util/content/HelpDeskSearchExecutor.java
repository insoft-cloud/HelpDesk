package com.insoft.helpdesk.util.content;

import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestCharge;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestHistory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.*;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
public class HelpDeskSearchExecutor<T,S> {

    public Specification<T> Search(Map<String, String> keyWord) {
        return ((root, query, builder) -> {
            Map<String, List<Predicate>> map = getPredicateWithKeyword(keyWord, root, builder);
            return builder.and(map.get("Search").toArray(new Predicate[0]));
        });
    }

    public Specification<T> Search(Map<String, String> keyWord, S s ,String id, String joinKey, String originKey) {
        return ((root, query, builder) -> {
            Map<String, List<Predicate>> map = getPredicateWithKeyword(keyWord, s, id, joinKey, originKey, root, builder);
            return builder.and(map.get("Search").toArray(new Predicate[0]));
        });
    }

    public Specification<T> Search(Map<String, String> keyWord, Map<String, String> where, S s ,String id, String joinKey, String originKey) {
        return ((root, query, builder) -> {
            Map<String, List<Predicate>> map = getPredicateWithKeyword(keyWord, where, s, id, joinKey, originKey, root, builder);
            List<Predicate> predicates = map.get("Where");
            List<Predicate> predicates1 = map.get("Search");
            if (predicates1.size() > 0) {
                predicates.add(builder.or(map.get("Search").toArray(new Predicate[0])));
            }
            return builder.and(predicates.toArray(new Predicate[0]));
        });
    }


    public Specification<T> Search(Map<String, String> keyWord, Map<String, String> where) {
        return ((root, query, builder) -> {
            Map<String, List<Predicate>> map = getPredicateWithKeyword(keyWord, where, root, builder);
            List<Predicate> predicates = map.get("Where");
            List<Predicate> predicates1 = map.get("Search");
            if (predicates1.size() > 0) {
                predicates.add(builder.or(map.get("Search").toArray(new Predicate[0])));
            }
            return builder.and(predicates.toArray(new Predicate[0]));
        });
    }

    public Specification<T> Search(Map<String, String> keyWord, Map<String, String> where, String dayWord, LocalDateTime start, LocalDateTime end) {
        return ((root, query, builder) -> {
            Map<String, List<Predicate>> map = getPredicateWithKeyword(keyWord, where, dayWord, start, end, root, builder);
            List<Predicate> predicates = map.get("Where");
            predicates.add(builder.or(map.get("Search").toArray(new Predicate[0])));
            return builder.and(predicates.toArray(new Predicate[0]));
        });
    }

    private Map<String, List<Predicate>> getPredicateWithKeyword(Map<String, String> keyWord, Root<T> root, CriteriaBuilder builder) {
        Map map = new HashMap();
        List<Predicate> predicate = new ArrayList<>();
        if(keyWord != null) {
            for (String key : keyWord.keySet()) {
                predicate.add(builder.like(
                        builder.upper(root.get(key)), "%" + keyWord.get(key).toUpperCase() + "%"
                ));
            }
        }
        map.put("Search", predicate);
        return map;
    }



    private Map<String, List<Predicate>> getPredicateWithKeyword(Map<String, String> keyWord, Map<String, String> where,S s ,String id, String joinKey, String originKey, Root<T> root, CriteriaBuilder builder) {
        Map<String, List<Predicate>> map = this.getPredicateWithKeyword(keyWord, where, root, builder);
        List<Predicate> predicate = new ArrayList<>();
        Join<T, S> m = root.join(joinKey, JoinType.INNER);
        predicate.add(builder.equal(m.get(originKey), id));
        map.put("Search",predicate);
        return map;
    }


    private Map<String, List<Predicate>> getPredicateWithKeyword(Map<String, String> keyWord, S s ,String id, String joinKey, String originKey, Root<T> root, CriteriaBuilder builder) {
        Map<String, List<Predicate>> map = this.getPredicateWithKeyword(keyWord, root, builder);
        List<Predicate> predicate = new ArrayList<>();
        Join<T, S> m = root.join(joinKey, JoinType.INNER);
        predicate.add(builder.equal(m.get(originKey), id));
        map.put("Search",predicate);
        return map;
    }


    private Map<String, List<Predicate>> getPredicateWithKeyword(Map<String, String> keyWord, Map<String, String> where, Root<T> root, CriteriaBuilder builder) {
        Map<String, List<Predicate>> map = this.getPredicateWithKeyword(keyWord, root, builder);
        List<Predicate> predicate = new ArrayList<>();
        if(where != null) {
            for (String key : where.keySet()) {
                predicate.add((builder.equal(
                        root.get(key), where.get(key)
                )));
            }
        }
        map.put("Where",predicate);
        return map;
    }


    private Map<String, List<Predicate>> getPredicateWithKeyword(Map<String, String> keyWord, Map<String, String> where, String dayWord, LocalDateTime start, LocalDateTime end, Root<T> root, CriteriaBuilder builder) {
        Map<String, List<Predicate>> map = this.getPredicateWithKeyword(keyWord, where, root, builder);
        List<Predicate> predicate = new ArrayList<>();
        predicate.add(builder.between(
                root.get(dayWord), start, end
        ));
        map.put("Where",predicate);
        return map;
    }
}
