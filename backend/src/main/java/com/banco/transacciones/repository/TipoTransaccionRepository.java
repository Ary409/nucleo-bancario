package com.banco.transacciones.repository;

import com.banco.transacciones.entity.TipoTransaccion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TipoTransaccionRepository extends JpaRepository<TipoTransaccion , Integer> {

}
