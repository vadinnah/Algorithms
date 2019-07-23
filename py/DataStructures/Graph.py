from math import inf
# class AdjacencyList:
# 	def __init__(self,vertices,edges,isDir):
# 		self.al = {}
# 		for v in vertices:
# 			self.al[v] = []
		
# 		for [u,v] in edges:
# 			self.al[u].append(v)
# 			if not isDir:
# 				self.al[v].append(u)
# 		pass

# 	def __str__(self):
# 		return str(self.al)

class Graph:
	def __init__(self,vertices,edges,isDir):
		self.V = vertices
		self.E = edges
		self.isDirected = isDir
		pass

	def GetAdjacencyList(self):
		al = {}
		for v in self.V:
			al[v] = []
		
		for [u,v] in self.E:
			al[u].append(v)
			if not self.isDirected:
				al[v].append(u)
		return al
	
	def GetAdjacencyMatrix(self):
		am = {}
		for u in self.V:
			am[u] = {}
			for v in self.V:
				am[u][v]=inf
		
		for e in self.E:
			w = 1 if len(e) < 3 else e[2]
			u,v=e
			am[u][v] = w
			if not self.isDirected:
				am[v][u] = w
		
		return am



# if __name__ == "__main__":
# 	pass

def __main__():
	try:
		a = Graph([1,2,3],[[1, 2], [1, 3]],False)
		print(a.GetAdjacencyList())
		print(a.GetAdjacencyMatrix())
	except Exception as e:
		print("Error ocurred")
		print(e)

__main__()