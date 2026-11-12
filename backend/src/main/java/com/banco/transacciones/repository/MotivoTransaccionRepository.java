package com.banco.transacciones.repository;

import com.banco.transacciones.entity.MotivoTransaccion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MotivoTransaccionRepository extends JpaRepository<MotivoTransaccion , Integer> {

}
