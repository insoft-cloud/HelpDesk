package com.insoft.helpdesk.util.content;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.*;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
public class HelpDeskSearchExecutor<T,S> {

    private static final String SEARCH = "Search";
    private static final String WHERE = "Where";

    public Specification<T> search(Map<String, String> keyWord) {
        return (root, query, builder) -> {
            Map<String, List<Predicate>> map = getPredicateWithKeyword(keyWord, root, builder);
            return builder.and(map.get(SEARCH).toArray(new Predicate[0]));
        };
    }

    public Specification<T> search(Map<String, String> keyWord, S s ,String id, String joinKey, String originKey) {
        return (root, query, builder) -> {
            Map<String, List<Predicate>> map = getPredicateWithKeyword(keyWord, s, id, joinKey, originKey, root, builder);
            return builder.and(map.get(SEARCH).toArray(new Predicate[0]));
        };
    }

    public Specification<T> search(Map<String, String> keyWord, Map<String, String> where, S s ,String id, String joinKey, String originKey) {
        return (root, query, builder) -> {
            Map<String, List<Predicate>> map = getPredicateWithKeyword(keyWord, where, s, id, joinKey, originKey, root, builder);
            List<Predicate> predicates = map.get(WHERE);
            List<Predicate> predicates1 = map.get(SEARCH);
            if (!predicates1.isEmpty()) {
                predicates.add(builder.or(map.get(SEARCH).toArray(new Predicate[0])));
            }
            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }


    public Specification<T> search(Map<String, String> keyWord, Map<String, String> where) {
        return (root, query, builder) -> {
            Map<String, List<Predicate>> map = getPredicateWithKeyword(keyWord, where, root, builder);
            List<Predicate> predicates = map.get(WHERE);
            List<Predicate> predicates1 = map.get(SEARCH);
            if (!predicates1.isEmpty()) {
                predicates.add(builder.or(map.get(SEARCH).toArray(new Predicate[0])));
            }
            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public Specification<T> search(Map<String, String> keyWord, Map<String, String> where, String dayWord, LocalDateTime start, LocalDateTime end) {
        return (root, query, builder) -> {
            Map<String, List<Predicate>> map = getPredicateWithKeyword(keyWord, where, dayWord, start, end, root, builder);
            List<Predicate> predicates = map.get(WHERE);
            predicates.add(builder.or(map.get(SEARCH).toArray(new Predicate[0])));
            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }

    private Map<String, List<Predicate>> getPredicateWithKeyword(Map<String, String> keyWord, Root<T> root, CriteriaBuilder builder) {
        Map map = new HashMap();
        List<Predicate> predicate = new ArrayList<>();
        if(keyWord != null) {
            for (Map.Entry<String, String> key : keyWord.entrySet()) {
                if(keyWord.get(key.getKey()).split(",").length > 1){
                    for (String key2 : keyWord.get(key.getKey()).split(",")){
                        predicate.add(builder.like(
                                builder.upper(root.get(key.getKey())), "%" + key2.toUpperCase(Locale.getDefault()) + "%"
                        ));
                    }
                }else {
                    predicate.add(builder.like(
                            builder.upper(root.get(key.getKey())), "%" + keyWord.get(key.getKey()).toUpperCase(Locale.getDefault()) + "%"
                    ));
                }
            }
        }
        map.put(SEARCH, predicate);
        return map;
    }



    private Map<String, List<Predicate>> getPredicateWithKeyword(Map<String, String> keyWord, Map<String, String> where, S ignoredS, String id, String joinKey, String originKey, Root<T> root, CriteriaBuilder builder) {
        Map<String, List<Predicate>> map = this.getPredicateWithKeyword(keyWord, where, root, builder);
        List<Predicate> predicate = new ArrayList<>();
        Join<T, S> m = root.join(joinKey, JoinType.INNER);
        predicate.add(builder.equal(m.get(originKey), id));
        map.put(SEARCH,predicate);
        return map;
    }


    private Map<String, List<Predicate>> getPredicateWithKeyword(Map<String, String> keyWord, S ignoredS, String id, String joinKey, String originKey, Root<T> root, CriteriaBuilder builder) {
        Map<String, List<Predicate>> map = this.getPredicateWithKeyword(keyWord, root, builder);
        List<Predicate> predicate = new ArrayList<>();
        Join<T, S> m = root.join(joinKey, JoinType.INNER);
        predicate.add(builder.equal(m.get(originKey), id));
        map.put(SEARCH,predicate);
        return map;
    }


    private Map<String, List<Predicate>> getPredicateWithKeyword(Map<String, String> keyWord, Map<String, String> where, Root<T> root, CriteriaBuilder builder) {
        Map<String, List<Predicate>> map = this.getPredicateWithKeyword(keyWord, root, builder);
        List<Predicate> predicate = new ArrayList<>();
        if(where != null) {
            for (Map.Entry<String, String> key : where.entrySet()) {
                predicate.add(builder.equal(root.get(key.getKey()), where.get(key.getKey())));
            }
        }
        map.put(WHERE,predicate);
        return map;
    }


    private Map<String, List<Predicate>> getPredicateWithKeyword(Map<String, String> keyWord, Map<String, String> where, String dayWord, LocalDateTime start, LocalDateTime end, Root<T> root, CriteriaBuilder builder) {
        Map<String, List<Predicate>> map = this.getPredicateWithKeyword(keyWord, where, root, builder);
        List<Predicate> predicate = new ArrayList<>();
        predicate.add(builder.between(
                root.get(dayWord), start, end
        ));
        map.put(WHERE,predicate);
        return map;
    }
}
