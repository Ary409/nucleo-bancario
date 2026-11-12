package com.banco.transacciones.repository;

import com.banco.transacciones.entity.Agencia;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgenciaRepository extends JpaRepository<Agencia, Integer> {

}
