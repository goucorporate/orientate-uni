/*
 *
 */

package com.goucorporation.android.orientateuni.presentation.views.fragments;

import android.content.Context;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;

import com.goucorporation.android.orientateuni.R;
import com.goucorporation.android.orientateuni.presentation.models.Lugar;
import com.goucorporation.android.orientateuni.presentation.utils.adapters.CodigosArrayAdapter;
import com.goucorporation.android.orientateuni.presentation.utils.data.LugarData;

import java.util.List;

public class CodigosFragment extends Fragment implements AdapterView.OnItemClickListener {

    private OnFragmentInteractionListener mListener;

    private ListView listView;
    private CodigosArrayAdapter adapter;

    public CodigosFragment() {
        // Required empty public constructor
    }

    public static CodigosFragment newInstance(String param1, String param2) {
        return new CodigosFragment();
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_codigos, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        listView = view.findViewById(R.id.listView);
        listView.setOnItemClickListener(this);
        iniciarLista();
    }

    private void iniciarLista() {
        List<Lugar> lugares = LugarData.lugares;
        adapter = new CodigosArrayAdapter(getContext(),lugares);
        listView.setAdapter(adapter);
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnFragmentInteractionListener) {
            mListener = (OnFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        mListener.onCodigoClicked(position);
    }

    public interface OnFragmentInteractionListener {
        void onCodigoClicked(int i);
    }
}
